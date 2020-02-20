import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Route, Switch, withRouter} from "react-router-dom";
import {addTodo, deleteTodo, fetchTodo} from "../model/actions/todo-actions";

const mapStateToProps = (state) => {
    return {todo: state.todo};
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
        kraukSarasa: () => fetchTodo(),
        papildykSarasa: (irasas) => addTodo(irasas),
        istrinkIrasa: (key) => deleteTodo(key)
    },
    dispatch)


class App extends React.Component {

    state = {
        label: ''
    }


    componentDidMount() {

        this.props.kraukSarasa();
    }

    handleChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.papildykSarasa(this.state.label);
        this.setState({
            label: ''
        })


    }


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
                                            <li key={item.id}>{item.label} <span></span>
                                                <button onClick={() => {this.props.istrinkIrasa(item.id)}}>Istrinti</button>
                                            </li>);
                                    }
                                )
                            }</ul>
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
