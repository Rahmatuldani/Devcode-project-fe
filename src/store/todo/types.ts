export enum TODO_ACTION_TYPES {
    REDUCER_LOADING = 'todo/REDUCER_LOADING',
    REDUCER_ERROR = 'todo/REDUCER_ERROR',

    FETCH_TODO = 'todo/FETCH_TODO',
    CREATE_TODO = 'todo/CREATE_TODO',
    DELETE_TODO = 'todo/DELETE_TODO',
    UPDATE_TODO = 'todo/UPDATE_TODO',
}

export type TodoType = {
    id: number;
    activity_group_id: string;
    title: string;
    is_active: boolean;
    priority: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type CustomTodoType = {
    activity_group_id?: number, 
    title?: string, 
    priority?: string,
    is_active?: boolean,
}