'use client'

import { useAuth } from '@/hooks/useAuth'
import LoginPage from '@/components/login-page'
import HomePage from '@/components/home-page'

export default function Page() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }
  return user ? (
    <HomePage user={user} onLogout={signOut} />
  ) : (
    <LoginPage onLogin={signInWithGoogle} />
  )
}
