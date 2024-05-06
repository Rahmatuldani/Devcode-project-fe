import { AnyAction } from "redux";
import { ActivityType } from "./types"
import { fetchActivity, findActivity, reducerError, reducerLoading } from "./action";

export type ActivityState = {
    readonly activity: ActivityType[];
    readonly selected: ActivityType | null;
    readonly isLoading: boolean;
    readonly error: Error | string | null;
}

export const ACTIVITY_INITIAL_STATE: ActivityState = {
    activity: [],
    selected: null,
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
    if (findActivity.match(action)) {
        return {...state, isLoading: false, selected: action.payload, error: null}
    }

    if (reducerError.match(action)) {
        return {...state, isLoading: false, error: action.payload}
    }
    return state
}