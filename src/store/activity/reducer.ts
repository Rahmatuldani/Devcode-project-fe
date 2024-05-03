import { AnyAction } from "redux";
import { ActivityType } from "./types"
import { fetchActivity, reducerError, reducerLoading } from "./action";

export type ActivityState = {
    readonly activity: ActivityType[];
    readonly isLoading: boolean;
    readonly error: Error | string | null;
}

export const ACTIVITY_INITIAL_STATE: ActivityState = {
    activity: [],
    isLoading: false,
    error: null
}

export function activityReducer(
    state = ACTIVITY_INITIAL_STATE,
    action: AnyAction
): ActivityState {
    if (reducerLoading.match(action)) {
        return {...state, isLoading: true}
    }

    if (fetchActivity.match(action)) {
        return {...state, isLoading: false, activity: action.payload, error: null}
    }

    if (reducerError.match(action)) {
        return {...state, isLoading: false, error: action.payload}
    }
    return state
}