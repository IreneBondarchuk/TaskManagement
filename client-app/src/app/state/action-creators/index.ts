import {Dispatch} from 'react'
import { PagingParams } from '../../models/pagination'
import { ActionType } from '../action-types'
import { Action, GenericAction } from '../actions'


export const actionCreators = {
    select:  <T> (item: T) => {return (dispatch: Dispatch<GenericAction<T>>) => {
        dispatch(
            {
                type: ActionType.SELECT,
                payload: item
            }
        )
    }},

    setItem: <T> (item: T) => {
        return (dispatch: Dispatch<GenericAction<T>>) => {
            dispatch(
                {
                    type: ActionType.SET,
                    payload: item
                }
            )
        } 
    }, 

    delete: (id: string) => {return (dispatch: Dispatch<Action>) => {
        dispatch(
            {
                type: ActionType.DELETE,
                payload: id
            }
        )
    }},  

    loadItems: <T> (data: Map<string, T>)  => {
        return (dispatch: Dispatch<GenericAction<T>>) => {
            dispatch(
                {
                    type: ActionType.LOAD_ITEMS,
                    payload: data
                }
            )
        } 
    },

    loading: (value: boolean) => {
        return (dispatch: Dispatch<Action>) => {
            dispatch(
                {
                    type: ActionType.SET_LOADING,
                    payload: value
                }
            )
        } 
    },

    submitting: (value: boolean) => {
        return (dispatch: Dispatch<Action>) => {
            dispatch(
                {
                    type: ActionType.SET_SUBMITTING,
                    payload: value
                }
            )
        } 
    },

    editMode: (value: boolean) => {
        return (dispatch: Dispatch<Action>) => {
            dispatch(
                {
                    type: ActionType.SET_EDIT_MODE,
                    payload: value
                }
            )
        } 
    },

    filtering: (value: boolean) => {
        return (dispatch: Dispatch<Action>) => {
            dispatch(
                {
                    type: ActionType.SET_FILTERING,
                    payload: value
                }
            )
        } 
    },
    resetPredicate: () => {
        return (dispatch : Dispatch<Action>) => {
            dispatch(
                {
                    type: ActionType.RESET_PREDICATE
                }
            )
        }
    },

    addPredicate: (predicate: string, value: any) => {
        return (dispatch : Dispatch<Action>) =>{
            dispatch(
                {
                    type: ActionType.ADD_PREDICATE,
                    payload: {
                        predicate,
                        value
                    }
                }
            )
        } 
    },


    setPagingParams: (params: PagingParams) => {
        return (dispatch : Dispatch<Action>) =>{
            dispatch(
                {
                    type: ActionType.SET_PAGING_PARAMS,
                    payload: params
                }
            )
        } 
    },
}






