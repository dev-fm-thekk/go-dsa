import { createClient } from "@/supabase/client";

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
