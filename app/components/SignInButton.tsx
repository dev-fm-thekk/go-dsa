'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/action";

export default function SignInButton() {
    return(
        <Button variant='destructive' onClick={signIn}>Continue with google</Button>
    )
}