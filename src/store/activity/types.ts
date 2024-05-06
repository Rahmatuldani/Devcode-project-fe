export enum ACTIVITY_ACTION_TYPES {
    REDUCER_LOADING = 'activity/REDUCER_LOADING',
    REDUCER_ERROR = 'activity/REDUCER_ERROR',

    FETCH_ACTIVITY = 'activity/FETCH_ACTIVITY',
    FIND_ACTIVITY = 'activity/FIND_ACTIVITY',
    CREATE_ACTIVITY = 'activity/CREATE_ACTIVITY',
    DELETE_ACTIVITY = 'activity/DELETE_ACTIVITY',
}

export type ActivityType = {
    id: number;
    title: string;
    created_at: Date;
}