"use client";

import { createContext, useEffect, useState, ReactNode } from "react"; // Added ReactNode
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

// 1. Ensure the context is clearly defined as a variable
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial user check
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();

    // Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false); // Ensure loading is false after state change
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    loading,
    signOut,
  };

  // 2. Use the variable directly
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}