'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignInWithGoogleResult } from '@/lib/auth/action'

interface LoginPageProps {
  onLogin: () => Promise<SignInWithGoogleResult>
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
            <p className="text-muted-foreground">Sign in to continue</p>
          </div>

          <Button onClick={onLogin} className="w-full" size="lg">
            Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  )
}
