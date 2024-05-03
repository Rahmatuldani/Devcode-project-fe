import axios, { AxiosInstance } from "axios";

const APIActivity = (() => {
    const server: AxiosInstance = axios.create({
        baseURL: 'https://todo.api.devcode.gethired.id/activity-groups',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    async function Find() {
        return await server.get('/')
    }

    async function Create() {
        return await server.post('/', {
            title: 'New Activity (Testing)',
            email: 'testing@gmail.com'
        })
    }

    async function Delete(id: number) {
        return await server.delete(`/${id}`)
    }

    return {
        Find,
        Create,
        Delete
    }
})();

export default APIActivity