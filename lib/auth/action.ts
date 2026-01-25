// requirements
// signIn function
// types and interfaces for user
// signOut function
// edit profile
// delete user

import { createClient } from "@/supabase/server";

export const signInWithGoogle = async () => {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) throw new Error(error.message);
        if (data.url) return { redirectUrl: data.url }
    } catch (err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}

export const signOut = async () => {
    try {
        const supabase = await createClient();
        const error = await supabase.auth.signOut();

        if (error) throw new Error(error.error?.message);
        return {
            success: 'signed out user'
        }
    } catch (err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}

