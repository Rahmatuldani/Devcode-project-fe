import { createSelector } from "reselect";
import { RootState } from "../store";
import { ActivityState } from "./reducer";

const selectActivityReducer = (state: RootState): ActivityState => state.activity;

export const selectActivity = createSelector(
    [selectActivityReducer],
    (activitySlice) => activitySlice.activity
)

export const selectActivityIsLoading = createSelector(
    [selectActivityReducer],
    (activitySlice) => activitySlice.isLoading
)
export const selectActivityError = createSelector(
    [selectActivityReducer],
    (activitySlice) => activitySlice.error
)