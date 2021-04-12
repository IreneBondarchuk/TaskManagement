import axios, { AxiosResponse } from 'axios'
import { Task } from '../models/task';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = 'http://localhost:5000/api/'

axios.interceptors.response.use(async response => {
    return sleep(500).then(() => {
        return response;
    }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
    })
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get:  <T> (url: string) => axios.get <T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post <T>(url, body).then(responseBody),
    put:  <T> (url: string, body: {}) => axios.put <T>(url, body).then(responseBody),
    del:  <T> (url: string) => axios.delete <T>(url).then(responseBody),
}

const Tasks = {
    list: () => requests.get<Task[]>('/worktasks'),
    details: (id: string) => requests.get<Task>(`/worktasks/${id}`),
    create: (task: Task) => requests.post<Task>('/worktasks', task),
    update: (task: Task) => requests.put<Task>(`/worktasks/${task.id}`, task),
    delete: (id: string) => requests.del<Task>(`/worktasks/${id}`)
}

const agent = {
    Tasks
}

export default agent