import axios, { AxiosInstance } from "axios";

const APIActivity = (() => {
    const server: AxiosInstance = axios.create({
        baseURL: 'https://todo.api.devcode.gethired.id/activity-groups',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    async function Find() {
        return await server.get('?email=testing@gmail.com')
    }
    
    async function FindOne(id: number) {
        return await server.get(`/${id}`)
    }

    async function Create() {
        return await server.post('/', {
            title: 'New Activity (Testing)',
            email: 'testing@gmail.com'
        })
    }
    
    async function Update(id: number, title: string) {
        return await server.patch(`/${id}`, {
            title: title
        })
    }

    async function Delete(id: number) {
        return await server.delete(`/${id}`)
    }

    return {
        Find,
        FindOne,
        Create,
        Update,
        Delete
    }
})();

export default APIActivity