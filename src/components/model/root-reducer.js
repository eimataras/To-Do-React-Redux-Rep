import todoReducer from "./reducers/todo-reducer";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    todo: todoReducer,
});

export default rootReducer;