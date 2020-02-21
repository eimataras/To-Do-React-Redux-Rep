export const REQUEST_TODO_LIST = 'REQUEST_TODO_LIST';
export const RECEIVE_TODO_LIST = 'RECEIVE_TODO_LIST';
export const RECEIVE_TODO_LIST_FAILURE = 'RECEIVE_TODO_LIST_FAILURE';

export const REQUEST_ADD_TODO = 'REQUEST_ADD_TODO';
export const RECEIVE_ADD_TODO = 'RECEIVE_ADD_TODO';
export const RECEIVE_ADD_TODO_FAILURE = 'RECEIVE_ADD_TODO_FAILURE';

export const REQUEST_DELETE_TODO = 'REQUEST_DELETE_TODO';
export const RECEIVE_DELETE_TODO = 'RECEIVE_DELETE_TODO';
export const RECEIVE_DELETE_TODO_FAILURE = 'RECEIVE_DELETE_TODO_FAILURE';

export const REQUEST_UPDATE_TODO = 'REQUEST_UPDATE_TODO';
export const RECEIVE_UPDATE_TODO = 'RECEIVE_UPDATE_TODO';
export const RECEIVE_UPDATE_TODO_FAILURE = 'RECEIVE_UPDATE_TODO_FAILURE';


export const requestTodoList = () => ({type: REQUEST_TODO_LIST,});
export const receiveTodoList = (json) => ({type: RECEIVE_TODO_LIST, payload: json});
export const receiveTodoListFailure = (error) => ({type: RECEIVE_TODO_LIST_FAILURE, payload: error});

export const requestAddTodo = () => ({type: REQUEST_ADD_TODO,});
export const receiveAddTodo = (irasas) => ({type: RECEIVE_ADD_TODO, payload: irasas});
export const receiveAddTodoFailure = (error) => ({type: RECEIVE_ADD_TODO_FAILURE, payload: error});

export const requestDeleteTodo = () => ({type: REQUEST_DELETE_TODO,});
export const receiveDeleteTodo = (id) => ({type: RECEIVE_DELETE_TODO, payload: id});
export const receiveDeleteTodoFailure = (error) => ({type: RECEIVE_DELETE_TODO_FAILURE, payload: error});

export const requestUpdateTodo = () => ({type: REQUEST_UPDATE_TODO,});
export const receiveUpdateTodo = (irasas) => ({type: RECEIVE_UPDATE_TODO, payload: irasas});
export const receiveUpdateTodoFailure = (error) => ({type: RECEIVE_UPDATE_TODO_FAILURE, payload: error});


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
    console.log('atejau iki action add ' + irasas)
    return (dispatch) => {

        dispatch(requestAddTodo());
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
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveAddTodo(json));
                })
            })
            .catch((error) => {
                dispatch(receiveAddTodoFailure(error));
            })
    }
};

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
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveDeleteTodo(json.id));
                })

            })
            .catch((error) => {
                dispatch(receiveDeleteTodoFailure(error));
            })
    }
};

export const updateTodo = (irasas) => {
    console.log('atejau i action update '+ irasas)
    return (dispatch) => {

        dispatch(requestUpdateTodo());
        fetch('http://localhost:8080/todo/edit', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: irasas.id,
                label: irasas.label,
                isDone: irasas.isDone
            })
        })
            .then((result) => {
                result.json().then((json) => {
                    dispatch(receiveUpdateTodo(json));
                })
            })
            .catch((error) => {
                dispatch(receiveUpdateTodoFailure(error));
            })
    }
};
