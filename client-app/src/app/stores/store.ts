import { createContext, useContext } from "react";
import CategoryStore from "./categoryStore";
import CommonStore from "./commonStore";
import ExecutorStore from "./executorStore";
import TaskStore from "./taskStore";

interface Store{
    taskStore: TaskStore,
    executorStore: ExecutorStore,
    categoryStore: CategoryStore,
    commonStore : CommonStore
}

export const store: Store = {
    taskStore: new TaskStore(),
    executorStore: new ExecutorStore(),
    categoryStore: new CategoryStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
}