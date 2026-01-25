export type UserRole = "admin" | "user";
export type UserLevel = "noob" | "veteran" | "pro" | "master";
export type SubmissionStatus =
    | "enrolled"
    | "in_progress"
    | "submitted"
    | "reviewed";
export type TaskType = "video" | "quiz" | "code" | "text";

export interface PublicUser {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole;
    level: UserLevel;
    streak: number;
    created_at: string;
    updated_at: string;
}

export interface Challenge {
    id: string;
    title: string;
    description: string | null;
    type: string | null;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    published: boolean;
}

export interface Task {
    id: string;
    label: string;
    url: string | null;
    type: TaskType;
    platform: string | null;
    created_at: string;
}

export interface ChallengeTask {
    challenge_id: string;
    task_id: string;
    position: number;
}

export interface Submission {
    id: string;
    user_id: string;
    challenge_id: string;
    status: SubmissionStatus;
    enrolled_at: string;
    submitted_at: string | null;
}