export type TodoType = {
    id: number;
    activity_group_id: string;
    title: string;
    is_active: string;
    priority: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}