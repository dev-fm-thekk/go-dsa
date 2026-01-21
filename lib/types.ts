
export type Task = {
    id: string;
    title: string;
    description: string;
    expires_at: string;
    is_live: boolean;
    created_at: string;
    updated_at: string;
};

export type TaskLink = {
    id: string;
    task_id: string;
    label: string;
    url: string;
    platform: string;
    created_at: string;
};

export type Resource = {
    id: string;
    task_id: string;
    label: string;
    url: string;
    created_at: string;
};
