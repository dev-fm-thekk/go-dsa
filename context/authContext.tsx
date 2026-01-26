'use client';

import React from "react"

import { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { signInWithGoogle, SignInWithGoogleResult, signOut, SignOutResult } from "@/lib/auth/action";
interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signInWithGoogle: () => Promise<SignInWithGoogleResult>;
    signOut: () => Promise<SignOutResult>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is already logged in
        const checkUser = async () => {
            const supabase = createClient();
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();
                
                setUser(user);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to check user');
            } finally {
                setLoading(false);
            }
        };

        checkUser();

        // Subscribe to auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                signInWithGoogle,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
