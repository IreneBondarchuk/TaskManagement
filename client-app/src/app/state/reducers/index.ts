import { combineReducers } from 'redux'
import executorsReducer from './executorsReducer';
import  tasksReducer  from './tasksReducer'

const reducers = combineReducers({
    tasks: tasksReducer,
    executors: executorsReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;