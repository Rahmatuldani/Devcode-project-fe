import { AnyAction } from "redux";
import { TodoType } from "./types";
import { createTodo, deleteTodo, fetchTodo, reducerError, reducerLoading, updateTodo } from "./action";

export type TodoState = {
    readonly todo: TodoType[];
    readonly isLoading: boolean;
    readonly error: Error | string | null;
}

export const TODO_INITIAL_STATE: TodoState = {
    todo: [],
    isLoading: false,
    error: null
}

export function todoReducer(
    state = TODO_INITIAL_STATE,
    action: AnyAction
): TodoState {
    if (reducerLoading.match(action)) {
        return {...state, isLoading: true}
    }

    if (fetchTodo.match(action)) {
        return {...state, isLoading: false, todo: action.payload, error: null}
    }
    if (createTodo.match(action)) {
        return {...state, isLoading: false, todo: [...state.todo, action.payload], error: null}
    }
    if (updateTodo.match(action)) {
        const newTodo = state.todo
        const index = newTodo.findIndex(item => item.id === action.payload.id);
        newTodo[index] = action.payload
        return {...state, isLoading: false, todo: newTodo, error: null}
    }
    if (deleteTodo.match(action)) {
        const newTodo = state.todo.filter(item => item.id != action.payload)
        return {...state, isLoading: false, todo: newTodo, error: null}
    }

    if (reducerError.match(action)) {
        return {...state, isLoading: false, error: action.payload}
    }
    return state
}