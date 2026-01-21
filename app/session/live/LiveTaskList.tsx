
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getLiveTasks() {
    const supabase = createClient();
    const { data: tasks, error } = await (await supabase).from('tasks').select('*').eq('is_live', true);

    if (error) {
        console.error('Error fetching live tasks:', error);
        return [];
    }

    return tasks;
}

export default async function LiveTaskList() {
    const tasks = await getLiveTasks();

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Live Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <Card key={task.id}>
                        <CardHeader>
                            <CardTitle>{task.title}</CardTitle>
                            <CardDescription>{task.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Expires at: {new Date(task.expires_at).toLocaleString()}</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/session/live/${task.id}`}>
                                <Button>Start Session</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
