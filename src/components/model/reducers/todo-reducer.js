import initialState from "../intial-state";
import {cloneDeep} from "lodash";
import {
    RECEIVE_ADD_TODO,
    RECEIVE_ADD_TODO_FAILURE,
    RECEIVE_DELETE_TODO,
    RECEIVE_DELETE_TODO_FAILURE,
    RECEIVE_TODO_LIST,
    RECEIVE_TODO_LIST_FAILURE,
    RECEIVE_UPDATE_TODO,
    RECEIVE_UPDATE_TODO_FAILURE,
    REQUEST_ADD_TODO,
    REQUEST_DELETE_TODO,
    REQUEST_TODO_LIST,
    REQUEST_UPDATE_TODO
} from "../actions/todo-actions";

const todoReducer = (state = cloneDeep(initialState.todo), action) => {
    switch (action.type) {

        //-----------GET TO-DO LIST FROM  INTERNET -------
        case REQUEST_TODO_LIST: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }
        case RECEIVE_TODO_LIST: {
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: action.payload,
            })
        }
        case RECEIVE_TODO_LIST_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }

        //-----------ADD NEW TO-DO ------------------------
        case REQUEST_ADD_TODO: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }
        case RECEIVE_ADD_TODO: {
            console.log('atejau i reduceri add ' + action.payload)
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: [...state.data, action.payload]
            })
        }
        case RECEIVE_ADD_TODO_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }

        //-----------DELETE TO-DO ------------------------
        case REQUEST_DELETE_TODO: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }
        case RECEIVE_DELETE_TODO: {
            console.log('atejau i reduceri delete ' + action.payload);
            console.log(state.data)
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: [...state.data.filter(todo => {
                    return todo.id !== action.payload
                })]
            })
        }
        case RECEIVE_DELETE_TODO_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }

        //-----------UPDATE TO-DO ------------------------
        case REQUEST_UPDATE_TODO: {
            return Object.assign({}, {
                ...state,
                isFetching: true,
                error: undefined,
            })
        }
        case RECEIVE_UPDATE_TODO: {
            console.log('atejau i reduceri update ' + action.payload)
            const newData = state.data.map((item) => item.id === action.payload.id ? action.payload : item);
            return Object.assign({}, {
                isFetching: false,
                error: undefined,
                data: newData
            })
        }
        case RECEIVE_UPDATE_TODO_FAILURE: {
            return Object.assign({}, {
                ...state,
                isFetching: false,
                error: action.payload,
            })
        }

        default:
            return state;
    }
};

export default todoReducer;