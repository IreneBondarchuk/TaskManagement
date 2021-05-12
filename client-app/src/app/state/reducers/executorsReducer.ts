import { Executor } from "../../models/executor";
import { Pagination, PagingParams } from "../../models/pagination";
import { ActionType } from "../action-types";
import { Action, GenericAction } from "../actions";


interface ExecutorsState {
    data: Map<string, Executor>,
    loading: boolean,
    selected: Executor | undefined,
    editMode: boolean,
    loadingInitial: boolean,
    submitting: boolean,
    predicate: Map<string, any>,
    filtering: boolean,
    pagination: Pagination | null,
    pagingParams: PagingParams;
}

const executorsInitialState: ExecutorsState = {
    data: new Map<string, Executor>(),
    selected: undefined,
    editMode: false,
    loading: false,
    loadingInitial: false,
    submitting: false,
    predicate: new Map().set('all', true),
    filtering: false,
    pagination: null,
    pagingParams: new PagingParams()
}

const reducer = (state = executorsInitialState, action: GenericAction<Executor> | Action ): ExecutorsState => {
    switch(action.type){
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
        case ActionType.RESET_PREDICATE: return { ...state,  predicate: new Map() }
        case ActionType.SET_PAGING_PARAMS: return { ...state,  pagingParams: action.payload }

        default: return state
    }
}

export default reducer;

