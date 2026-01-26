"use client";

import { use, useMemo, Suspense } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { PlusIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fetchUser, SignOutResult } from "@/lib/auth/action";
import { getChallenges } from "@/lib/challenges/action";
import { Challenge, UserRole } from "@/lib/type";
import { ChallengeCard } from "./challenge-card";

interface HomePageProps {
  user: User;
  onLogout: () => Promise<SignOutResult>;
}

/**
 * GridSkeleton: Loading state for the challenge list
 */
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse h-[350px] bg-muted rounded-xl w-full" />
      ))}
    </div>
  );
}

/**
 * RenderChallenges: Unwraps the combined promise and maps the list
 */
function RenderChallenges({
  profilePromise,
  challengesPromise,
}: {
  profilePromise: Promise<any>;
  challengesPromise: Promise<any>;
}) {
  const profile = use(profilePromise);
  const challengesResult = use(challengesPromise);

  if (!profile?.data) return <p className="text-destructive text-center py-10">User profile not found.</p>;
  
  const challenges: Challenge[] = challengesResult?.data || [];

  if (challenges.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl">
        <p className="text-muted-foreground">No challenges available right now.</p>
      </div>
    );
  }

  return (
    <>
      {challenges.map((challenge) => (
        <div className="flex-1">
          <ChallengeCard
            key={challenge.id}
            user={profile.data}
            challenge={challenge}
            onDelete={() => {}}
            onEdit={() => {}}
            onEnroll={() => {}}
            onPublish={() => {}}
          />
        </div>
      ))}
    </>
  );
}

/**
 * RenderAddButton: Resolves the profile to check for admin role
 */
function RenderAddButton({ profilePromise }: { profilePromise: Promise<any> }) {
  const profile = use(profilePromise);
  
  if (profile?.data?.role !== "admin") return null;

  return (
    <Link href="/challenge/add">
      <Button variant="outline" size="icon" title="Add Challenge">
        <PlusIcon className="h-5 w-5" />
      </Button>
    </Link>
  );
}

/**
 * Main HomePage Component
 */
export default function HomePage({ user, onLogout }: HomePageProps) {
  // 1. Fetch the user profile from DB
  const profilePromise = useMemo(() => fetchUser(user.id), [user.id]);

  // 2. Chain the challenge fetch so it waits for the profile role
  const challengesPromise = useMemo(async () => {
    const profileResult = await profilePromise;
    const userRole = (profileResult?.data?.role ?? "user") as UserRole;
    return getChallenges({ role: userRole });
  }, [profilePromise]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Platform</h1>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
            <Button onClick={onLogout} variant="ghost" size="sm">
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <header className="flex flex-row justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Challenges</h2>
              <p className="text-muted-foreground mt-1">
                Browse and manage your technical assessments.
              </p>
            </div>

            <Suspense fallback={<Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />}>
              <RenderAddButton profilePromise={profilePromise} />
            </Suspense>
          </header>

          <Suspense fallback={<GridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RenderChallenges
                profilePromise={profilePromise}
                challengesPromise={challengesPromise}
              />
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}