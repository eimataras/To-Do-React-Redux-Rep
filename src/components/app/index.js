import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Route, Switch, withRouter} from "react-router-dom";
import {addTodo, deleteTodo, fetchTodo, updateTodo} from "../model/actions/todo-actions";

const mapStateToProps = (state) => {
    return {todo: state.todo};
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
        kraukSarasa: () => fetchTodo(),
        papildykSarasa: (irasas) => addTodo(irasas),
        istrinkIrasa: (key) => deleteTodo(key),
        atnaujinkIrasa: (irasas) => updateTodo(irasas)
    },
    dispatch);


class App extends React.Component {

    state =
        {
            label: '',
        };


    componentDidMount() {

        this.props.kraukSarasa();
    }

    handleChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.papildykSarasa(this.state.label);
        this.setState({
            label: ''
        })
    };

    handleChange2 = (item) => {
        // item.preventDefault();
        console.log('Sekancioj eilutej sedi siunciamas item')
        console.log(item);
        const irasas = {
            id: item.id,
            label: item.label,
            isDone: !item.isDone
        };
        this.props.atnaujinkIrasa(irasas);

    };


    render() {

        if (this.props.todo.isFetching) {
            return (<h1>Dabar kraunu</h1>);
        }

        const items = this.props.todo.data;
        console.log(items)
        console.log(this.state);

        return (
            <Switch>
                <Route path="/" exact={true}>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h3>
                                My todo's:
                            </h3>
                            <ul>{
                                items.map((item) => {
                                        return (
                                            <li key={item.id}>

                                                {item.label}

                                                <button onClick={() => {
                                                    this.props.istrinkIrasa(item.id)
                                                }}>Istrinti
                                                </button>


                                                <form>
                                                    <label>Is it done?</label>
                                                    <input type="checkbox"
                                                           onChange={() => {
                                                               this.handleChange2(item)
                                                           }}
                                                           checked={item.isDone}
                                                    />
                                                </form>
                                            </li>);
                                    }
                                )
                            }
                            </ul>
                            <form onSubmit={this.handleSubmit}>
                                <label>Add new todo: </label>
                                <input type="text" onChange={this.handleChange} value={this.state.label} autoFocus/>
                            </form>
                        </header>

                    </div>
                </Route>
                <Route path="/test" exact={true}>
                    <div>
                        <h1>Veikia</h1>
                    </div>
                </Route>
            </Switch>
        )
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(App);
