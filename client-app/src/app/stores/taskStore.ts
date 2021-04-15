import { makeAutoObservable, reaction, runInAction } from "mobx"
import agent from "../api/agent";
import { Task } from "../models/task"
import {v4 as uuid} from 'uuid'

export default class TaskStore {
    taskRegistry = new Map<string, Task>()
    selectedTask: Task | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    submitting = false;
    predicate = new Map().set('all', true);
    filtering = false;

    constructor(){ 
        makeAutoObservable(this)
        reaction(
           
            () => this.predicate.keys(),
            () => {
                this.filtering = true;
                this.taskRegistry.clear();
                this.loadTasks();
                this.filtering = false;
            }
        )
    }

    
    setPredicate = (predicate: string, value: string) =>{
        const resetPredicate = ()=>{
            this.predicate.forEach((value, key) =>{
                this.predicate.delete(key);
            })
        }
        switch(predicate){
            case 'all': 
            resetPredicate();
            this.predicate.set('all', true);
            break;
            case 'title': 
            resetPredicate();
            this.predicate.set('title', value);
            break;
            case 'categoryId': 
            resetPredicate();
            this.predicate.set('categoryId', value);
            break;
            case 'executorId': 
            resetPredicate();
            this.predicate.set('executorId', value);
            break;
        }
    }

    get axiosParams(){
        const params = new URLSearchParams();
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }


    get tasksByDate(){
        return Array.from(this.taskRegistry.values()).sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
    }
    loadTasks = async ()=>{
        this.setLoadingInitial(true);
        try{
            const result = await agent.Tasks.list(this.axiosParams);
            result.forEach(task =>{
                task.deadline = task.deadline.split('T')[0];
                this.taskRegistry.set(task.id, task);
                })
            this.setLoadingInitial(false);
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }

    }


    setLoadingInitial=(state: boolean) => {
        this.loadingInitial = state;
    }

    selectTask=(id: string) => {
        this.selectedTask = this.taskRegistry.get(id) ;
    }

    cancelSelectTask = () => {
        this.selectedTask = undefined;
        this.editMode = false;
    }

    openForm = (id?: string) => {
        id ? this.selectTask(id) : this.cancelSelectTask();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createTask = async(task: Task) => {
        this.loading = true;
        task.id = uuid();
        try{
            await agent.Tasks.create(task);
            runInAction(() =>{
                this.taskRegistry.set(task.id, task);
                this.selectedTask = task;
                this.editMode = false;
                this.loading = false;
            });
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateTask = async(task: Task) => {
        this.loading = true;
        try{
            await agent.Tasks.update(task);
            runInAction(() => {
                this.taskRegistry.set(task.id, task);
                this.selectedTask = task;
                this.editMode = false;
                this.loading = false;
            })

        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteTask = async(id: string) => {
        this.submitting = true;
        try{
            await agent.Tasks.delete(id);
            runInAction(() => {
                this.taskRegistry.delete(id);
                if(this.selectedTask?.id === id) this.cancelSelectTask(); 
                this.submitting = false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
       
    }

}
