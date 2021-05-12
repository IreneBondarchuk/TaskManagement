import { Task } from "../../models/task";
import { ActionType } from "../action-types";
import { Action, GenericAction } from "../actions";


interface TasksState {
    data: Map<string, Task>,
    loading: boolean,
    selected: Task | undefined,
    editMode: boolean,
    loadingInitial: boolean,
    submitting: boolean,
    predicate: Map<string, any>,
    filtering: boolean
}

const tasksInitialState: TasksState = {
    data: new Map<string, Task>(),
    selected: undefined,
    editMode: false,
    loading: false,
    loadingInitial: false,
    submitting: false,
    predicate: new Map().set('all', true),
    filtering: false
}

const reducer = (state = tasksInitialState, action: GenericAction<Task> | Action ): TasksState => {
    switch(action.type){
        case ActionType.SET : 
            const task = action.payload;
            return {
                ...state,
                data: new Map(Object.entries(state.data)).set(task.id, { ...task,  deadline: task.deadline?.split('T')[0] }),
                selected: task,
                loading: false 
            } 
        case ActionType.LOAD_ITEMS : return {...state, data: action.payload, loading: false};
        case ActionType.SELECT: return {...state, selected : action.payload};
        case ActionType.DELETE:
            const data = new Map(Object.entries(state.data));
            data.delete(action.payload);
            return {...state, data: data, submitting: false };
        case ActionType.SET_LOADING: return {...state, loading: action.payload};
        case ActionType.SET_SUBMITTING: return {...state, submitting: action.payload};
        case ActionType.SET_FILTERING: return {...state, filtering: action.payload};
        case ActionType.ADD_PREDICATE: 
            return {
                ...state,
                predicate: new Map(Object.entries(state.predicate)).set(action.payload.predicate, action.payload.value)
            };
        case ActionType.RESET_PREDICATE:  
            return { 
                ...state, 
                predicate: new Map() 
            }

        default: return state
    }
}

export default reducer;
