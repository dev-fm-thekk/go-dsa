import { createClient } from '@/supabase/client';
import { PublicUser, Submission, UserLevel } from '../type';

/**
 * Enrolls a user in a challenge. 
 * Checks for existing enrollment first to prevent duplicates.
 */
export const enrollChallenge = async (userId: string, challengeId: string) => {
    const supabase = createClient();
    // 1. Check if already enrolled
    const { data: existing } = await supabase
        .from('submissions')
        .select('id')
        .eq('user_id', userId)
        .eq('challenge_id', challengeId)
        .single();
 
    if (existing) {
        throw new Error("User is already enrolled in this challenge.");
    }

    // 2. Insert new submission
    const { data, error } = await supabase
        .from('submissions')
        .insert({
            user_id: userId,
            challenge_id: challengeId,
            status: 'enrolled',
            enrolled_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) throw error;
    return data as Submission;
};

