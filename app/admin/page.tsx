'use client';

import { useAuth } from "@/context/useAuth";
import { useEffect, useState } from "react";
import { authorizeCoordinator, getTasks, publishATask, Task } from "@/lib/coordinator/action";
import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";

import { TaskTable } from "../components/TaskTable";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Admin() {
    const { user, loading } = useAuth();
    const supabase = createClient();

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
    const [tasks, setTasks] = useState<Task[]>([]); // Renamed to plural for clarity

    // combined Auth & Fetch logic
    useEffect(() => {
        if (loading || !user) return;

        const initAdmin = async () => {
            try {
                // 1. Check Authorization
                const result = await authorizeCoordinator(user, supabase);

                if (result.error === 'unauthorized') {
                    setIsAuthorized(false);
                    setCheckingStatus(false);
                    return;
                }

                setIsAuthorized(true);

                // 2. Fetch Tasks only once authorized
                const data = await getTasks();
                if (data.success) {
                    setTasks(data.success);
                } else {
                    console.error(data.error);
                }
            } catch (err) {
                console.error("Initialization failed:", err);
            } finally {
                setCheckingStatus(false);
            }
        };

        initAdmin();
    }, [user, loading, supabase]);

    // Handle Publish with local state update
    const onPublish = async (taskId: string) => {
        const response = await publishATask(user!, taskId);
        if (response.success) {
            // Optimistically update the UI without a full refresh
            setTasks(prev =>
                prev.map(t => t.id === taskId ? { ...t, published: true } : t)
            );
        }
    };

    const onDelete = async (taskId: string) => {
        // Implement your delete logic here
    };

    if (loading || checkingStatus) {
        return <p>Verifying</p>; // Clean loading UI
    }

    if (!isAuthorized) return notFound();

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
                    <p className="text-muted-foreground">
                        Manage, publish, and track your team's tasks here.
                    </p>
                </div>

                <Link
                    href="/admin/add-task"
                    className={buttonVariants({ variant: "default", size: "sm" })}
                >
                    <Plus className="h-4 w-4" />
                    Create Task
                </Link>
            </div>

            <Separator />

            {/* Table Section */}
            <div className="bg-card rounded-lg border shadow-sm">
                <TaskTable tasks={tasks} onDelete={onDelete} onPublish={onPublish} />
            </div>
        </div>
    );
}