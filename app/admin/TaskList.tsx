'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { goLive } from "./actions";

export default function TaskList() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data inside useEffect instead of top-level async
    useEffect(() => {
        const fetchTasks = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching tasks:', error);
            } else {
                setTasks(data || []);
            }
            setLoading(false);
        };

        fetchTasks();
    }, []);

    if (loading) return <p className="mt-8 text-gray-500">Loading tasks...</p>;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Created Tasks</h2>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                        <Card key={task.id}>
                            <CardHeader>
                                <CardTitle>{task.title}</CardTitle>
                                <CardDescription>{task.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p><span className="font-bold">Expires:</span> {new Date(task.expires_at).toLocaleString()}</p>
                                <p>
                                    <span className="font-bold">Status:</span>{' '}
                                    <span className={task.is_live ? "text-green-600 font-bold" : "text-amber-600"}>
                                        {task.is_live ? 'Live' : 'Draft'}
                                    </span>
                                </p>
                            </CardContent>
                            <CardFooter>
                                {!task.is_live && (
                                    <form action={async () => {
                                        const result = await goLive(task.id);
                                        if (result?.error) {
                                            alert(result.error);
                                        } else {
                                            // Optimistic update: Update UI locally
                                            setTasks(prev => prev.map(t => 
                                                t.id === task.id ? { ...t, is_live: true } : t
                                            ));
                                        }
                                    }}>
                                        <Button type="submit" variant="outline" className="w-full">
                                            Go Live
                                        </Button>
                                    </form>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}