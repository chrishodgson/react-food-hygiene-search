import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import history from './history';
import reducers from './reducers';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/authority/:id" component={App}/>
            </Switch>
        </Router>
    </Provider>
    , document.querySelector('.container'));

