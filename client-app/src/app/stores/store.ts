import { createContext, useContext } from "react";
import ExecutorStore from "./executorStore";
import TaskStore from "./taskStore";

interface Store{
    taskStore: TaskStore,
    executorStore: ExecutorStore
}

export const store: Store = {
    taskStore: new TaskStore(),
    executorStore: new ExecutorStore()
}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
}