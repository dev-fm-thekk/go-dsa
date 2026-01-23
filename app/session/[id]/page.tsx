import { PublicTaskCard } from "@/app/components/PublicTaskCard";
import { Task } from "@/lib/coordinator/action";
import { getTaskById, getTaskResources, getTaskLinks } from "@/lib/task/action";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SessionTaskPage({
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

    // if task is not published, don't show it
    if (!singleTask.published) {
        return notFound();
    }

    // Fetch resources and links for this task
    const [resourcesResult, linksResult] = await Promise.all([
        getTaskResources(id),
        getTaskLinks(id)
    ]);

    const resources = resourcesResult.success || [];
    const links = linksResult.success || [];

    return (
        <div className="px-6 py-8 max-w-5xl mx-auto space-y-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/session" className="hover:text-primary transition-colors">
                    Tasks
                </Link>
                <ChevronLeft className="h-4 w-4 rotate-180" />
                <span className="text-foreground font-medium">{singleTask.title}</span>
            </nav>

            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Task Overview</h1>
                <p className="text-muted-foreground">
                    Review the task details and associated resources.
                /</p>
            </header>

            <div className="flex justify-center py-8">
                <div className="w-full max-w-md">
                    <PublicTaskCard 
                        task={singleTask} 
                        resources={resources}
                        links={links}
                    />
                </div>
            </div>
        </div>
    );
}
