import { makeAutoObservable, reaction, runInAction } from "mobx"
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'
import { Executor } from "../models/executor";
import { Pagination, PagingParams } from "../models/pagination";

export default class ExecutorStore {
    executorRegistry = new Map<string, Executor>()
    selectedExecutor: Executor | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    submitting = false;
    filtering = false;
    pagination: Pagination | null = null
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor(){
        makeAutoObservable(this)
        reaction(
            () => this.predicate.keys(),
            () => {
                this.filtering = true;
                this.pagingParams = new PagingParams();
                this.executorRegistry.clear();
                this.loadExecutors();
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
            case 'surname': 
            resetPredicate();
            this.predicate.set('surname', value);
            break;
            case 'hasActiveTasks': 
            resetPredicate();
            this.predicate.set('hasActiveTasks', true);
            break;
        }
    }

    get axiosParams(){
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    setPagingParams(pagingParams: PagingParams){
        this.pagingParams = pagingParams;
    }

    get executors(){
        return Array.from(this.executorRegistry.values());
    }
    loadExecutors = async ()=>{
        this.setLoadingInitial(true);
        try{
            const result = await agent.Executors.list(this.axiosParams);
            runInAction(() =>{
                this.executorRegistry.clear();
                result.data.forEach(exec =>{
                        this.executorRegistry.set(exec.id, exec);
                    })
                this.setPagination(result.pagination);
                this.setLoadingInitial(false);
            })
          
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }

    }

    get options(){
        let options: { key: string; text: string; value: string; }[] = []
        this.executorRegistry.forEach((exec) => {
            options.push({key: exec.id, text: `${exec.firstName} ${exec.surname}`, value: exec.id})
        })
       return options;
    }

    setPagination = (pagination: Pagination) =>{
        this.pagination = pagination;
    }

    setLoadingInitial=(state: boolean) => {
        this.loadingInitial = state;
    }

    selectExecutor=(id: string) => {
        this.selectedExecutor = this.executorRegistry.get(id);
    }

    cancelSelectExecutor = () => {
        this.selectedExecutor = undefined;
        this.editMode = false;
    }

    openForm = (id?: string) => {
        id ? this.selectExecutor(id) : this.cancelSelectExecutor();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createExecutor = async(executor: Executor) => {
        this.loading = true;
        executor.id = uuid();
        try{
            await agent.Executors.create(executor);
            runInAction(() =>{
                this.executorRegistry.set(executor.id, executor);
                this.selectedExecutor = executor;
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

    updateExecutor= async(executor: Executor) => {
        this.loading = true;
        try{
            await agent.Executors.update(executor);
            runInAction(() => {
                this.executorRegistry.set(executor.id, executor);
                this.selectedExecutor = executor;
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

    deleteExecutor = async(id: string) => {
        this.submitting = true;
        try{
            await agent.Executors.delete(id);
            runInAction(() => {
                this.executorRegistry.delete(id);
                if(this.selectedExecutor?.id === id) this.cancelSelectExecutor(); 
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
