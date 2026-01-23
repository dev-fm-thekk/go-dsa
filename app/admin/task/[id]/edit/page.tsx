import { TaskCard } from "@/app/components/TaskCard";
import { Task } from "@/lib/coordinator/action";
import { getTaskById } from "@/lib/task/action";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditTask({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const task = await getTaskById(id);

    // Error handling or missing task
    if (task.error || !task.success) {
        return notFound();
    }

    const taskData = task.success as Task[];
    const singleTask = taskData[0];

    return (
<div className="px-6 py-8 max-w-5xl mx-auto space-y-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/admin" className="hover:text-primary transition-colors">
                    Dashboard
                </Link>
                <ChevronLeft className="h-4 w-4 rotate-180" />
                <span className="text-foreground font-medium">Edit Task</span>
            </nav>

            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Task Preview</h1>
                <p className="text-muted-foreground">
                    Review how your task appears and manage its associated resources.
                </p>
            </header>

            <div className="flex justify-center py-8">
                <div className="w-full max-w-md">
                    <TaskCard task={singleTask} />
                </div>
            </div>
        </div>
    );
}
