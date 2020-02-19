export const REQUEST_TODO_LIST = 'REQUEST_TODO_LIST';
export const RECEIVE_TODO_LIST = 'RECEIVE_TODO_LIST';
export const RECEIVE_TODO_LIST_FAILURE = 'RECEIVE_TODO_LIST_FAILURE';

export const REQUEST_POST_TODO = 'REQUEST_POST_TODO';
export const ADD_NEW_TODO = 'ADD_NEW_TODO';
export const ADD_NEW_TODO_FAILURE = 'ADD_NEW_TODO_FAILURE';

export const REQUEST_DELETE_TODO = 'REQUEST_DELETE_TODO';
export const DELETE_ONE_TODO = 'DELETE_ONE_TODO';
export const DELETE_ONE_TODO_FAILURE = 'DELETE_ONE_TODO_FAILURE';


export const requestTodoList = () => ({type: REQUEST_TODO_LIST,});
export const receiveTodoList = (json) => ({type: RECEIVE_TODO_LIST, payload: json});
export const receiveTodoListFailure = (error) => ({type: RECEIVE_TODO_LIST_FAILURE, payload: error});

export const requestPostTodo = () => ({type: REQUEST_POST_TODO,});
export const addNewTodo = (irasas) => ({type: ADD_NEW_TODO, payload: irasas});
export const addNewTodoFailure = (error) => ({type: ADD_NEW_TODO_FAILURE, payload: error});

export const requestDeleteTodo = () => ({type: REQUEST_DELETE_TODO,});
export const deleteOneTodo = (id) => ({type: DELETE_ONE_TODO, payload: id});
export const deleteOneTodoFailure = (error) => ({type: DELETE_ONE_TODO_FAILURE, payload: error});


export const fetchTodo = () => {
    return (dispatch) => {
        dispatch(requestTodoList());
        fetch('http://localhost:8080/todo/all', {method: 'get'})
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveTodoList(json));
                })
            })
            .catch((error) => {
                dispatch(receiveTodoListFailure(error));
            })
    }

};

export const addTodo = (irasas) => {
    console.log('atejau iki action add')
    return (dispatch) => {

        dispatch(requestPostTodo());
        fetch('http://localhost:8080/todo/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                label: irasas,
            })
        })
            .then(() => {
                dispatch(addNewTodo(irasas));
            })
            .catch((error) => {
                dispatch(addNewTodoFailure(error))
            })
    }
}

export const deleteTodo = (key) => {
    console.log('atejau iki action delete ' + key)
    return (dispatch) => {
        dispatch(requestDeleteTodo());
        fetch('http://localhost:8080/todo/delete?id=' + key, {
            method: 'delete',
            body: JSON.stringify(key),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then(() => dispatch(deleteOneTodo(key)))
            .catch((error) => {
                dispatch(deleteOneTodoFailure(error))
            })
    }
}