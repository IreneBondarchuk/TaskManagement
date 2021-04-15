import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { Category } from '../models/category';
import { Executor } from '../models/executor';
import { PaginatedResult } from '../models/pagination';
import { Task } from '../models/task';

// const sleep = (delay: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay)
//     })
// }


axios.defaults.baseURL = 'http://localhost:5000/api/'

axios.interceptors.response.use(async response => {
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { status} = error.response!;
    switch(status){
        case 400: 
        toast.error('bad request');
        break;
        case 404: 
        toast.error('not found');
        break;
        case 500: 
        toast.error('server error');
        break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get:  <T> (url: string) => axios.get <T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post <T>(url, body).then(responseBody),
    put:  <T> (url: string, body: {}) => axios.put <T>(url, body).then(responseBody),
    del:  <T> (url: string) => axios.delete <T>(url).then(responseBody),
}

const Tasks = {
    list: (params: URLSearchParams) => axios.get<Task[]>('/worktasks', {params}).then(responseBody),
    details: (id: string) => requests.get<Task>(`/worktasks/${id}`),
    create: (task: Task) => requests.post<Task>('/worktasks', task),
    update: (task: Task) => requests.put<Task>(`/worktasks/${task.id}`, task),
    delete: (id: string) => requests.del<Task>(`/worktasks/${id}`)
}

const Executors = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Executor[]>>('/executors', {params}).then(responseBody),
    details: (id: string) => requests.get<Executor>(`/executors/${id}`),
    create: (executor: Executor) => requests.post<Executor>('/executors', executor),
    update: (executor: Executor) => requests.put<Executor>(`/executors/${executor.id}`, executor),
    delete: (id: string) => requests.del<Task>(`/executors/${id}`)
}

const Categories = {
    list: () => requests.get<Category[]>('/categories')
}



const agent = {
    Tasks,
    Executors,
    Categories
}

export default agent