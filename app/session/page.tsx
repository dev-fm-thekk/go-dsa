import { getPublishedTasks } from "@/lib/task/action";
import { Task } from "@/lib/coordinator/action";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight } from "lucide-react";

export default async function SessionsPage() {
    const tasksResult = await getPublishedTasks();

    if (tasksResult.error) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-destructive">Failed to load tasks.</p>
            </div>
        )
    }

    const tasks = tasksResult.success as Task[];

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight">
                    Published Tasks
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Here are all the tasks that are currently available.
                </p>
            </header>

            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <Link key={task.id} href={`/session/${task.id}`} className="group block">
                            <Card className="h-full flex flex-col transition-all duration-200 ease-in-out group-hover:shadow-lg group-hover:border-primary/60">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold tracking-tight leading-snug">
                                        {task.title}
                                    </CardTitle>
                                    <div className="pt-2">
                                        <Badge variant="outline">Published</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-between">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {task.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 mt-auto">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>Due by {new Date(task.expires_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                                            <span>View Task</span>
                                            <ChevronRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <h2 className="text-2xl font-semibold text-muted-foreground">No tasks available yet.</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Please check back later.</p>
                </div>
            )}
        </div>
    )
}
