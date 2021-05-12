import { PagingParams } from "../../models/pagination";
import { ActionType } from "../action-types";


export interface LoadItemsAction<T> {
    type: ActionType.LOAD_ITEMS,
    payload: Map<string, T> 
}

export interface SelectAction<T> {
    type: ActionType.SELECT,
    payload: T
}

export interface GetAction<T>  {
    type: ActionType.GET,
    payload: T
}

export interface EditAction<T> {
    type: ActionType.EDIT,
    payload: T
}

export interface CreateAction<T> {
    type: ActionType.CREATE,
    payload: T
}

export interface DeleteAction {
    type: ActionType.DELETE,
    payload: string
}

export interface SetLoadingAction {
    type: ActionType.SET_LOADING,
    payload: boolean
}

export interface SetSubmittingAction {
    type: ActionType.SET_SUBMITTING,
    payload: boolean
}

export interface SetFilteringAction {
    type: ActionType.SET_FILTERING,
    payload: boolean
}

export interface SetEditModeAction {
    type: ActionType.SET_EDIT_MODE,
    payload: boolean
}


export interface SetItemAction<T> {
    type: ActionType.SET,
    payload: T
}

export interface AddPredicate {
    type: ActionType.ADD_PREDICATE,
    payload: {
        predicate: string,
        value: any
    }
}

export interface ResetPredicate {
    type: ActionType.RESET_PREDICATE
}

export interface SetPagingParams {
    type: ActionType.SET_PAGING_PARAMS,
    payload: PagingParams
}


export type GenericAction<T> =
| LoadItemsAction<T>
| SelectAction<T>
| GetAction<T>
| CreateAction<T>
| EditAction<T>
| SetItemAction<T>



export type Action = 
| SetLoadingAction
| AddPredicate
| ResetPredicate
| SetEditModeAction
| SetSubmittingAction
| SetFilteringAction
| DeleteAction
| SetPagingParams



