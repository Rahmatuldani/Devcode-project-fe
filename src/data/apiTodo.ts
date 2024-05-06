import axios, { AxiosInstance } from "axios";
import { CustomTodoType } from "../store/todo/types";

const APITodo = (() => {
    const server: AxiosInstance = axios.create({
        baseURL: 'https://todo.api.devcode.gethired.id/todo-items',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    async function Find(id: string) {
        return await server.get(`?activity_Group_id=${id}`)
    }
    
    async function Create(data: CustomTodoType) {
        return await server.post('/', data)
    }
    
    async function Update(id: number, data: CustomTodoType) {
        return await server.patch(`/${id}`, data)
    }
    
    async function Delete(id: number) {
        return await server.delete(`/${id}`)
    }

    return {
        Find,
        Create,
        Update,
        Delete
    }
})();

export default APITodo;