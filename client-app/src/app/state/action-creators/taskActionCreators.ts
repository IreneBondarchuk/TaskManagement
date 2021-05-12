import { actionCreators } from '.'
import agent from '../../api/agent'
import { Task } from '../../models/task'
import { store } from '../store'


export const getTaskItems = () => {
    return async () => {
        actionCreators.loading(true);
        try{
            const predicate = store.getState().tasks.predicate;
            const result = await agent.Tasks.list(getAxiosParams(predicate));
            const data = new Map<string, Task>();
            result.forEach(task =>{
                    task.deadline = task.deadline?.split('T')[0];
                    data.set(task.id, task);
                });
            actionCreators.loadItems<Task>(data);
        }catch(err){
            console.log(err);
            actionCreators.loading(false);
        }
        
    }
}

export const loadTask = (id: string) => {
    return async () => {
        let task = getTask(id);
        if(task) {
            actionCreators.select<Task>(task);
            return task;
        }else {
            actionCreators.loading(true);
            try{
                task = await agent.Tasks.details(id);
                actionCreators.setItem<Task>(task);
                return task;
            } catch(error) {
                console.log(error);
                actionCreators.loading(false);
            }
        }
        
    }
}

export const createTask = async(task: Task) => {
    actionCreators.loading(true);
    try{
        await agent.Tasks.create(task);
        actionCreators.setItem<Task>(task);
        actionCreators.editMode(false);
    }catch(error){
        console.log(error);
        actionCreators.loading(false);
    }
}

export const updateTask = async(task: Task) => {
    actionCreators.loading(true);
    try{
        await agent.Tasks.update(task);
        actionCreators.setItem<Task>(task);
        actionCreators.editMode(false);
    }catch(error){
        console.log(error);
        actionCreators.loading(false);
    }
}

export const deleteTask = async(id: string) => {
    actionCreators.submitting(true);
        try{
            await agent.Tasks.delete(id);
            actionCreators.delete(id);
        }catch(error){
            console.log(error);
            actionCreators.submitting(false);
        }
}
const getTask = (id: string) => {
    return store.getState().tasks.data.get(id);
}



const getAxiosParams =  (predicate: Map<string, any>) => {
    const params = new URLSearchParams();
    predicate.forEach((value, key) => {
        params.append(key, value);
    })
    return params;
}