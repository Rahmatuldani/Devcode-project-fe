import { AxiosResponse } from "axios";
import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer";
import { CustomTodoType, TODO_ACTION_TYPES, TodoType } from "./types";
import { Dispatch } from "redux";
import APITodo from "../../data/apiTodo";
import { ApiRespons } from "../shared/types";

// Reducer Loading
export type ReducerLoading = Action<TODO_ACTION_TYPES.REDUCER_LOADING>;
export const reducerLoading = withMatcher(
    (): ReducerLoading => createAction(TODO_ACTION_TYPES.REDUCER_LOADING)
);

// Reducer Error
export type ReducerError = ActionWithPayload<TODO_ACTION_TYPES.REDUCER_ERROR, Error>;
export const reducerError = withMatcher(
    (error: Error): ReducerError => createAction(TODO_ACTION_TYPES.REDUCER_ERROR, error)
);

// Begin Fetch Todo
export type FetchTodo = ActionWithPayload<TODO_ACTION_TYPES.FETCH_TODO, TodoType[]>;
export const fetchTodo = withMatcher(
    (todo: TodoType[]): FetchTodo => createAction(TODO_ACTION_TYPES.FETCH_TODO, todo)
)

export async function FetchTodoFunction(dispatch: Dispatch, id: string) {
    dispatch(reducerLoading())
    try {
        const response: AxiosResponse = await APITodo.Find(id)
        const { data }: ApiRespons = response.data;
        dispatch(fetchTodo(data as TodoType[]))
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}
// End Fetch Todo

// Begin Create Todo
export type CreateTodo = ActionWithPayload<TODO_ACTION_TYPES.CREATE_TODO, TodoType>;
export const createTodo = withMatcher(
    (todo: TodoType): CreateTodo => createAction(TODO_ACTION_TYPES.CREATE_TODO, todo)
)

export async function CreateTodoFunction(dispatch: Dispatch, todo: CustomTodoType) {
    dispatch(reducerLoading())
    try {
        const response: AxiosResponse = await APITodo.Create(todo)
        dispatch(createTodo(response.data as TodoType))
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}
// End Fetch Todo

// Begin Create Todo
export type UpdateTodo = ActionWithPayload<TODO_ACTION_TYPES.UPDATE_TODO, TodoType>;
export const updateTodo = withMatcher(
    (todo: TodoType): UpdateTodo => createAction(TODO_ACTION_TYPES.UPDATE_TODO, todo)
)

export async function UpdateTodoFunction(dispatch: Dispatch,id: number, todo: CustomTodoType) {
    dispatch(reducerLoading())
    try {
        const response: AxiosResponse = await APITodo.Update(id, todo)
        dispatch(updateTodo(response.data as TodoType))
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}
// End Fetch Todo

// Begin Delete Todo
export type DeleteTodo = ActionWithPayload<TODO_ACTION_TYPES.DELETE_TODO, number>;
export const deleteTodo = withMatcher(
    (id: number): DeleteTodo => createAction(TODO_ACTION_TYPES.DELETE_TODO, id)
)

export async function DeleteTodoFunction(dispatch: Dispatch, id: number) {
    dispatch(reducerLoading())
    try {
        await APITodo.Delete(id)
        dispatch(deleteTodo(id))
    } catch (error) {
        dispatch(reducerError(error as Error))
    }
}
// End Fetch Todo