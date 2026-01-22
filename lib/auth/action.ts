import { createClient } from "../supabase/client";

export const signIn = async () => {
  try {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  } catch (err) {
    console.error(err);
  }
};

export const signOut = async () => {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error(err);
  }
};
