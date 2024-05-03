import { AxiosResponse } from "axios"
import APIActivity from "../../data/apiActivity"
import { ApiRespons } from "../shared/types"
import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer";
import { ACTIVITY_ACTION_TYPES, ActivityType } from "./types";
import { Dispatch } from "redux";

// Reducer Loading
export type ReducerLoading = Action<ACTIVITY_ACTION_TYPES.REDUCER_LOADING>;
export const reducerLoading = withMatcher(
    (): ReducerLoading => createAction(ACTIVITY_ACTION_TYPES.REDUCER_LOADING)
);

// Reducer Error
export type ReducerError = ActionWithPayload<ACTIVITY_ACTION_TYPES.REDUCER_ERROR, Error>;
export const reducerError = withMatcher(
    (error: Error): ReducerError => createAction(ACTIVITY_ACTION_TYPES.REDUCER_ERROR, error)
);

// Begin Fetch Activity
export type FetchActivity = ActionWithPayload<ACTIVITY_ACTION_TYPES.FETCH_ACTIVITY, ActivityType[]>;
export const fetchActivity = withMatcher(
    (activity: ActivityType[]): FetchActivity => createAction(ACTIVITY_ACTION_TYPES.FETCH_ACTIVITY, activity)
)

export async function FetchActivityFunction(dispatch: Dispatch) {
    dispatch(reducerLoading())
    try {
        const response: AxiosResponse = await APIActivity.Find()
        const { data }: ApiRespons = response.data;
        const result: ActivityType[] = (data as ActivityType[]).slice(0, 15)
        dispatch(fetchActivity(result))
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}
// End Fetch Activity

// Begin Find Activity
export type FindActivity = ActionWithPayload<ACTIVITY_ACTION_TYPES.FIND_ACTIVITY, number>;
export const findActivity = withMatcher(
    (id: number): FindActivity => createAction(ACTIVITY_ACTION_TYPES.FIND_ACTIVITY, id)
)
export async function FindActivityFunction(dispatch: Dispatch, id: number) {
    await dispatch(findActivity(id))
}
// End Find Activity

// Create Activity
export async function CreateActivityFunction(dispatch: Dispatch) {
    dispatch(reducerLoading())
    try {
        await APIActivity.Create()
        FetchActivityFunction(dispatch)
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}

// Create Activity
export async function UpdateActivityFunction(dispatch: Dispatch, id: number, title: string) {
    dispatch(reducerLoading())
    try {
        await APIActivity.Update(id, title)
        FetchActivityFunction(dispatch)
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}

// Delete Activity
export async function DeleteActivityFunction(dispatch: Dispatch, id: number) {
    dispatch(reducerLoading())
    try {
        await APIActivity.Delete(id)
        FetchActivityFunction(dispatch)
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}