'use client'

import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { SignOutResult } from '@/lib/auth/action'

interface HomePageProps {
  user: User
  onLogout: () => Promise<SignOutResult>
}

export default function HomePage({ user, onLogout }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Home</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button onClick={onLogout} variant="outline">
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Welcome back!</h2>
          <p className="text-muted-foreground">
            You are now signed in. Add your content here.
          </p>
        </div>
      </main>
    </div>
  )
}
