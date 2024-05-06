import { createSelector } from "reselect";
import { RootState } from "../store";
import { TodoState } from "./reducer";

const selectTodoReducer = (state: RootState): TodoState => state.todo;

export const selectTodo = createSelector(
    [selectTodoReducer],
    (todoSlice) => todoSlice.todo
)

export const selectTodoIsLoading = createSelector(
    [selectTodoReducer],
    (todoSlice) => todoSlice.isLoading
)
export const selectTodoError = createSelector(
    [selectTodoReducer],
    (todoSlice) => todoSlice.error
)