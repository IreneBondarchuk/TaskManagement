import { actionCreators } from '.'
import agent from '../../api/agent'
import { Executor } from '../../models/executor'
import { store } from '../store'
import {v4 as uuid} from 'uuid'



export const getExecutorItems = () => {
    return async () => {
        actionCreators.loading(true);
        try{
            const result = await agent.Executors.list(getAxiosParams(store.getState().executors.predicate));
            const data = new Map<string, Executor>();
            result.data.forEach(executor => data.set(executor.id, executor));
            actionCreators.loadItems<Executor>(data);
        }catch(err){
            console.log(err);
            actionCreators.loading(false);
        }
        
    }
}

export const getOptions = () => {
    let options: { key: string; text: string; value: string; }[] = []
    store.getState().executors.data.forEach((exec) => {
        options.push({key: exec.id, text: `${exec.firstName} ${exec.surname}`, value: exec.id})
    })
   return options;
}

export const loadExecutor = (id: string) => {
    return async () => {
        let executor = getExecutor(id);
        if(executor) {
            actionCreators.select<Executor>(executor);
            return executor;
        }else {
            actionCreators.loading(true);
            try{
                executor = await agent.Executors.details(id);
                actionCreators.setItem<Executor>(executor);
                return executor;
            } catch(error) {
                console.log(error);
                actionCreators.loading(false);
            }
        }
        
    }
}

export const createExecutor = async(executor: Executor) => {
    actionCreators.loading(true);
    executor.id = uuid();
    try{
        await agent.Executors.create(executor);
        actionCreators.setItem<Executor>(executor);
        actionCreators.editMode(false);
    }catch(error){
        console.log(error);
        actionCreators.loading(false);
    }
}

export const updateExecutor = async(executor: Executor) => {
    actionCreators.loading(true);
    try{
        await agent.Executors.update(executor);
        actionCreators.setItem<Executor>(executor);
        actionCreators.editMode(false);
    }catch(error){
        console.log(error);
        actionCreators.loading(false);
    }
}

export const deleteExecutor = async(id: string) => {
    actionCreators.submitting(true);
        try{
            await agent.Executors.delete(id);
            actionCreators.delete(id);
        }catch(error){
            console.log(error);
            actionCreators.submitting(false);
        }
}
const getExecutor = (id: string) => {
    return store.getState().executors.data.get(id);
}

const setPredicate = (predicate: string, value: string) =>{
    switch(predicate){
        case 'all': 
            actionCreators.resetPredicate();
            actionCreators.addPredicate('all', true);
            break;
        case 'surname': 
            actionCreators.resetPredicate();
            actionCreators.addPredicate('surname', value);
            break;
        case 'hasActiveTasks': 
            actionCreators.resetPredicate();
            actionCreators.addPredicate('hasActiveTasks', true);
            break;
    }
}


const getAxiosParams =  (predicate: Map<string, any>) => {
    const params = new URLSearchParams();
    const pagingParams = store.getState().executors.pagingParams;
    params.append('pageNumber', pagingParams.pageNumber.toString());
    params.append('pageSize', pagingParams.pageSize.toString());
    predicate.forEach((value, key) => {
        params.append(key, value);
    })
    return params;
}
