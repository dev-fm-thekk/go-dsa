'use server';

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export type TaskResource = {
    task_id: string;
    label: string;
    url: string;
}

export type TaskLink = {
    task_id: string;
    label: string;
    url: string;
    platform: string;
}

export const getTaskById = async (taskId: string) => {
    try {
        const supabase = await createClient();
        let response =  await supabase.from('tasks').select('*').eq('id', taskId);
        if (response.error) return {
            error: response.error
        }
        return {
            success: response.data
        }
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}

export const getPublishedTasks = async () => {
    try {
        const supabase = await createClient();
        const response = await supabase
            .from('tasks')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });
        
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
        return {
            success: response.data
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        };
    }
}

/**
 * Add a single resource to a task
 */
export const addTaskResource = async (resource: TaskResource) => {
    try {
        const supabase = await createClient();
        const response = await supabase
            .from('resources')
            .insert({
                task_id: resource.task_id,
                label: resource.label,
                url: resource.url
            })
            .select()
            .single();
        
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
        // Revalidate the task edit page to show the new resource
        revalidatePath(`/admin/task/${resource.task_id}/edit`);
        
        return {
            success: response.data
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        };
    }
}

/**
 * Add multiple resources to a task
 */
export const addTaskResources = async (resources: TaskResource[]) => {
    try {
        const supabase = await createClient();
        const response = await supabase
            .from('resources')
            .insert(resources.map(r => ({
                task_id: r.task_id,
                label: r.label,
                url: r.url
            })))
            .select();
        
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
        // Revalidate the task edit page to show the new resources
        if (resources.length > 0) {
            revalidatePath(`/admin/task/${resources[0].task_id}/edit`);
        }
        
        return {
            success: response.data
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        };
    }
}

/**
 * Add a single task link to a task
 */
export const addTaskLink = async (link: TaskLink) => {
    try {
        const supabase = await createClient();
        const response = await supabase
            .from('tasklinks')
            .insert({
                task_id: link.task_id,
                label: link.label,
                url: link.url,
                platform: link.platform
            })
            .select()
            .single();
        
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
        // Revalidate the task edit page to show the new link
        revalidatePath(`/admin/task/${link.task_id}/edit`);
        
        return {
            success: response.data
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        };
    }
}

/**
 * Add multiple task links to a task
 */
export const addTaskLinks = async (links: TaskLink[]) => {
    try {
        const supabase = await createClient();
        const response = await supabase
            .from('tasklinks')
            .insert(links.map(l => ({
                task_id: l.task_id,
                label: l.label,
                url: l.url,
                platform: l.platform
            })))
            .select();
        
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
        // Revalidate the task edit page to show the new links
        if (links.length > 0) {
            revalidatePath(`/admin/task/${links[0].task_id}/edit`);
        }
        
        return {
            success: response.data
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        };
    }
}

/**
 * Get resources for a task
 */
export const getTaskResources = async (taskId: string) => {
    try {
        const supabase = await createClient();
        const response = await supabase
            .from('resources')
            .select('*')
            .eq('task_id', taskId)
            .order('created_at', { ascending: false });
        
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
        return {
            success: response.data
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        };
    }
}

/**
 * Get task links for a task
 */
export const getTaskLinks = async (taskId: string) => {
    try {
        const supabase = await createClient();
        const response = await supabase
            .from('tasklinks')
            .select('*')
            .eq('task_id', taskId)
            .order('created_at', { ascending: false });
        
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
        return {
            success: response.data
        };
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        };
    }
}