'use server';

import { createClient } from "@/lib/supabase/server";
import { authorizeAdmin } from "./admin";
import { revalidatePath } from "next/cache";

// 1. Added prevState as the first argument for useActionState compatibility
export async function createTask(prevState: any, formData: FormData) {
  const supabase = await createClient(); // Await it once at the start

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };

  const authResult = await authorizeAdmin(user, supabase);
  if (authResult?.error) return { error: authResult.error };

  // 2. Extract Task Data
  const taskData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    expires_at: formData.get('expires_at') as string,
    is_live: false, // Default to false until "Go Live" is clicked
  };

  // 3. Insert Task
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .insert(taskData)
    .select()
    .single();

  if (taskError) return { error: "Task creation failed: " + taskError.message };

  // 4. Insert TaskLinks (The 2 DSA problems)
  const links = [
    { 
      task_id: task.id, 
      label: formData.get('link1_label') as string, 
      url: formData.get('link1_url') as string, 
      platform: formData.get('link1_platform') as any 
    },
    { 
      task_id: task.id, 
      label: formData.get('link2_label') as string, 
      url: formData.get('link2_url') as string, 
      platform: formData.get('link2_platform') as any 
    }
  ];

  const { error: linksError } = await supabase.from('tasklinks').insert(links);
  
  if (linksError) {
    // If links fail, we might want to delete the orphaned task, 
    // but for now, we just report the error.
    return { error: "Task created, but problem links failed: " + linksError.message };
  }

  // 5. Insert Resources (Optional)
  const resourceLabel = formData.get('resource_label') as string;
  const resourceUrl = formData.get('resource_url') as string;

  if (resourceLabel && resourceUrl) {
    const { error: resError } = await supabase.from('resources').insert({
      task_id: task.id,
      label: resourceLabel,
      url: resourceUrl
    });
    if (resError) console.error("Resource insert failed:", resError.message);
  }

  revalidatePath('/admin');
  
  // Return the success state that useActionState expects
  return { 
    success: true, 
    error: null, 
    taskId: task.id 
  };
}

export async function goLive(taskId: string) {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();

    if (!user) return { error: "Unauthorized" };

    const authResult = await authorizeAdmin(user, await supabase);
    if (authResult?.error) return { error: authResult.error };

    // Note: Ensure your schema actually has 'is_live'. 
    // It wasn't in your previous SQL snippet.
    const { data, error } = await (await supabase)
        .from('tasks')
        .update({ is_live: true })
        .eq('id', taskId);

    if (error) return { error: error.message };

    revalidatePath('/admin');
    return { data };
}