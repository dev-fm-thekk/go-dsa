import { createClient } from "../supabase/server";

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