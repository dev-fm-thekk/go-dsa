import { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";

export type Task = {
    id: string,
    title: string,
    description: string,
    expires_at: Date,
    created_at: Date,
    updated_at: Date,
    published: boolean
}

export type TaskResources = {
    id: string,
    task_id: string,
    label: string,
    url: string,
    created_at: Date
}

export type TaskLinks = {
    id: string,
    task_id: string,
    label: string,
    url: string,
    platform: string,
    created_at: Date
}

export const authorizeCoordinator = async (user: Pick<User, "id">, supabase: SupabaseClient<any, "public", "public", any, any>) => {
    try {
        const { data, error } = await supabase
            .from("user_roles")
            .select(`role_id, roles (id,name)`)
            .eq("user_id", user.id).limit(1);

        if (error) throw new Error(error.message);
        if (data.length === 0) return {
            error: "user not found"
        }
        
        const role = data[0].roles as unknown as { id: string, name: string } ;
        
        if (role.name === "coordinator") return {
            success: 'authorized'
        }
        return {
            error: 'unauthorized'
        }
    } catch (err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}

export const publishATask = async (user: User, task_id: string) => {
    try {
        const supabase = createClient();
        let result = await authorizeCoordinator(user, supabase);
        if (result.error) return result;
        
        console.log(task_id);
        let response = await supabase.from('tasks').update({ published: true }).eq("id", task_id);
        console.log(response);
        if (response.error) return {
            error: response.error
        };
        return {
            success: 'Published task'
        }
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}

export const uploadTask = async (user: User, task: Task) => {
    try {
        const supabase = createClient();
        let result = await authorizeCoordinator(user, supabase);
        if (result.error) return result;
        const response = await supabase.from("tasks").insert(task)

        if (response.error) throw new Error(result.error);
        return {
            success: 'created a task'
        }
    } catch (err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : "unexpected error"
        }
    }
}

export const getTasks = async () => {
    try {
        const supabase = createClient();
        let response = await supabase.from('tasks').select('*');
        if (response.error) return {
            error: response.error
        }
        return {
            success: response.data as Task[]
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}

export const assignTaskResources = async (user: User, resource: TaskResources) => {
    try {
        const supabase = createClient();
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}