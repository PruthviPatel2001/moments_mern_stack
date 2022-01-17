import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(

    <Router>

        <Provider store={store}>

            <App />

        </Provider>
        
    </Router>, document.getElementById("root")
)


