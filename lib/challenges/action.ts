// Adjust these imports based on whether this middleware runs on the server or client
import { createClient } from "@/supabase/client";
import { Challenge, ChallengeTask, Task } from "../type";


export type ActionResponse<T> = { data?: T; error?: string };

// --- Middleware Functions ---

export const createChallenge = async (
    challenge: Partial<Omit<Challenge, "id" | "created_at" | "updated_at">>,
): Promise<ActionResponse<Challenge>> => {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("challenges")
            .insert(challenge)
            .select()
            .single();

        if (error) return { error: error.message };
        return { data };
    } catch (err) {
        return { error: "Failed to create challenge" };
    }
};

/**
 * Creates a new standalone task in the database
 */
export const createTask = async (
    task: Omit<Task, "id" | "created_at">
): Promise<ActionResponse<Task>> => {
    try {
        const supabase = createClient();

        const { data: newTask, error } = await supabase
            .from("tasks")
            .insert(task)
            .select()
            .single();

        if (error) return { error: error.message };
        return { data: newTask };
    } catch (err) {
        return { error: "Failed to create task" };
    }
};

/**
 * Links an existing task to a specific challenge at a defined position
 */
export const addTaskToChallenge = async (
    challengeId: string,
    taskId: string,
    position: number
): Promise<ActionResponse<ChallengeTask>> => {
    try {
        const supabase = createClient();

        const { data: link, error } = await supabase
            .from("challenge_tasks")
            .insert({
                challenge_id: challengeId,
                task_id: taskId,
                position: position,
            })
            .select()
            .single();

        if (error) return { error: error.message };
        return { data: link };
    } catch (err) {
        return { error: "Failed to link task to challenge" };
    }
};

export const publishChallenge = async (
    id: string,
): Promise<ActionResponse<Challenge>> => {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("challenges")
            .update({ published: true, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single();

        if (error) return { error: error.message };
        return { data };
    } catch (err) {
        return { error: "Failed to publish challenge" };
    }
};

export const editChallenge = async (
    id: string,
    updates: Partial<Challenge>,
): Promise<ActionResponse<Challenge>> => {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("challenges")
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single();

        if (error) return { error: error.message };
        return { data };
    } catch (err) {
        return { error: "Failed to edit challenge" };
    }
};

export const editTask = async (
    id: string,
    updates: Partial<Task>,
): Promise<ActionResponse<Task>> => {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("tasks")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) return { error: error.message };
        return { data };
    } catch (err) {
        return { error: "Failed to edit task" };
    }
};

export const deleteChallenge = async (
    id: string,
): Promise<ActionResponse<boolean>> => {
    try {
        const supabase = createClient();
        const { error } = await supabase.from("challenges").delete().eq("id", id);
        if (error) return { error: error.message };
        return { data: true };
    } catch (err) {
        return { error: "Failed to delete challenge" };
    }
};

export const removeTaskFromChallenge = async (
    challengeId: string,
    taskId: string,
): Promise<ActionResponse<boolean>> => {
    try {
        const supabase = createClient();
        const { error } = await supabase
            .from("challenge_tasks")
            .delete()
            .match({ challenge_id: challengeId, task_id: taskId });

        if (error) return { error: error.message };
        return { data: true };
    } catch (err) {
        return { error: "Failed to remove task association" };
    }
};

export const deleteTask = async (
    id: string,
): Promise<ActionResponse<boolean>> => {
    try {
        const supabase = createClient();
        const { error } = await supabase.from("tasks").delete().eq("id", id);
        if (error) return { error: error.message };
        return { data: true };
    } catch (err) {
        return { error: "Failed to delete task" };
    }
};
