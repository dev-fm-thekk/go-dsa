'use client';

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "./auth";

export default function SignInWithGoogle() {
    return (
        <div className="w-full h-[90dvh] flex justify-center items-center">
            <Button variant='destructive' onClick={signInWithGoogle}>Continue With Google</Button>
        </div>
    )
}