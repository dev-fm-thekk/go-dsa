import { createClient } from "@/supabase/client";
import { PublicUser } from "../type";

export interface AuthError {
  error: string;
}

export interface SignInWithGoogleSuccess {
  redirectUrl: string;
}

export interface SignOutSuccess {
  success: string;
}

export type SignInWithGoogleResult =
  | SignInWithGoogleSuccess
  | AuthError;

export type SignOutResult =
  | SignOutSuccess
  | AuthError;

export type FetchUserResult = 
    | PublicUser
    | { error: string }

    export const signInWithGoogle = async (): Promise<SignInWithGoogleResult> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) throw new Error(error.message);

    if (data?.url) {
      return { redirectUrl: data.url };
    }

    return { error: "No redirect URL returned" };
  } catch (err) {
    console.error(err);
    return {
      error: err instanceof Error ? err.message : "unexpected error",
    };
  }
};

export const signOut = async (): Promise<SignOutResult> => {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    return {
      success: "signed out user",
    };
  } catch (err) {
    console.error(err);
    return {
      error: err instanceof Error ? err.message : "unexpected error",
    };
  }
};

export const fetchUser = async (id: string) => {
    try {
        const supabase = createClient();
        const response = await supabase.from('users').select('*').eq("id", id).single();
        if (response.error) throw new Error(response.error.message);
        return {
            data: response.data
        }
    } catch(err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'unexpected error'
        }
    }
}