'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export async function createSubmission(taskId: string) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'You must be logged in to submit a task.' };
    }

    const qrCodeData = uuidv4();

    const { data, error } = await supabase
        .from('submissions')
        .insert({
            task_id: taskId,
            user_id: user.id,
            qr_code_data: qrCodeData,
        })
        .select();

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/session/live/${taskId}`);
    return { data };
}
