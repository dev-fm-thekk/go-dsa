'use client';

import AddTaskForm from "@/app/components/addTaskForm";
import { useAuth } from "@/context/useAuth";
import { notFound } from "next/navigation";

export default function AddTask() {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading ... </p>
    if (!user) return notFound();

    return (
        <>
            <div className="w-full flex justify-center">
                <AddTaskForm user={user}/>
            </div>
        </>
    )
} 