
import { createClient } from "@/lib/supabase/server";
import ProblemCard from "@/app/components/ProblemCard";
import Timer from "@/app/components/Timer";
import { Button } from "@/components/ui/button";
import { Task, TaskLink, Resource } from "@/lib/types";

async function getTask(id: string): Promise<Task | null> {
    const supabase = createClient();
    const { data: task, error } = await supabase.from('tasks').select('*').eq('id', id).single();

    if (error) {
        console.error('Error fetching task:', error);
        return null;
    }

    return task;
}

async function getTaskLinks(taskId: string): Promise<TaskLink[]> {
    const supabase = createClient();
    const { data: tasklinks, error } = await supabase.from('tasklinks').select('*').eq('task_id', taskId);

    if (error) {
        console.error('Error fetching task links:', error);
        return [];
    }

    return tasklinks;
}

async function getResources(taskId: string): Promise<Resource[]> {
    const supabase = createClient();
    const { data: resources, error } = await supabase.from('resources').select('*').eq('task_id', taskId);

    if (error) {
        console.error('Error fetching resources:', error);
        return [];
    }

    return resources;
}


export default async function TaskSessionPage({ params }: { params: { id: string } }) {
    const task = await getTask(params.id);
    const tasklinks = await getTaskLinks(params.id);
    const resources = await getResources(params.id);

    if (!task) {
        return <p>Task not found</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <ProblemCard task={task} tasklinks={tasklinks} resources={resources} />
                </div>
                <div>
                    <Timer expires_at={task.expires_at} />
                    <Button>Submit</Button>
                </div>
            </div>
        </div>
    );
}
