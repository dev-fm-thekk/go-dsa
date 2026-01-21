import { createClient } from "@/lib/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";

type Task = {
    title: string,
    description: string
}

export const authorizeAdmin = async (user: Pick<User, "id">, supabase: SupabaseClient<any, "public", "public", any, any>) => {
    try {
        const { data, error } = await supabase
            .from("user_roles")
            .select( `role_id, roles (id,name)`)
            .eq("user_id", user.id).limit(1);
        
        if (error) throw new Error(error.message);
        if (data.length === 0) return {
            error: "user not found"
        }

        const userRole = data[0].roles[0].name;

        if (userRole !== "coordinator") return {
            error: "Unauthorized access"
        }

        return {
            success: "authorized"
        }
    } catch(err) {
        console.error(err);
    }
}
export const uploadTask = async (user: User) => {
    try {
        const supabase = createClient();
        let authResult = await authorizeAdmin(user, supabase)
        if (authResult?.error) return authResult.error;
        
    } catch (err) {
        console.error(err);
    }
}


