import { Task } from "./task";

export interface Executor {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  hiringDate: string;
  job: string;
  tasks: Task[];
}