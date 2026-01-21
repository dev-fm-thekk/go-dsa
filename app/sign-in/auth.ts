import { createClient } from "@/lib/supabase/client";

export const signInWithGoogle =  () => {
    try{
        const supabase =  createClient();
        supabase.auth.signInWithOAuth({
            provider: 'google'
        }).catch(error => console.error(error));

    } catch(err) {
        console.error(err);
    }
}

export const signOut =  () => {
    try {
        const supabase = createClient();
        supabase.auth.signOut().catch(error => console.error(error))
    } catch(err) {
        console.error(err);
    }
}