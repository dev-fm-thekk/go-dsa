import { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";

type Task = {
    id: string,
    title: string,
    description: string,
    expires_at: Date,
    created_at: Date,
    updated_at: Date,
    published: boolean
}

type TaskResources = {
    id: string,
    task_id: string,
    label: string,
    url: string,
    created_at: Date
}

type TaskLinks = {
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
        
        let response = await supabase.from('task').update({ publihed: true }).eq("id", task_id);
        if (response.error) return response.error;
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