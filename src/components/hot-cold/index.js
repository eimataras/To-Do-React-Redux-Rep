import {hot} from "react-hot-loader/root";
import App from "../app";
import React from "react";
import configureStore from "../model/reduxStore";
import {Provider} from "react-redux";
import {HashRouter as Router} from "react-router-dom";


export const HotApp = hot(App);


export const store = configureStore();

export const ColdApp = () => (
    <Provider store={store}>
        <Router>
            <HotApp/>
        </Router>
    </Provider>
);
