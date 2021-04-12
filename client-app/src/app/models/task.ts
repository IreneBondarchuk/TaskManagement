import { Category } from "./category";
import { Executor } from "./executor";

  export interface Task {
    id: string;
    title: string;
    description: string;
  //  executor: Executor;
    deadline: string;
    status: number;
    //category: Category;
  }