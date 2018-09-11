import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import history from './history';
import reducers from './reducers';

import RegionsList from './containers/regions_list';
import LocalAuthoritiesList from './containers/local_authorities_list';
import EstablishmentsList from './containers/establishments_list';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={RegionsList}/>
                <Route path="/region/:id" component={LocalAuthoritiesList}/>
                <Route path="/localAuthority/:id" component={EstablishmentsList}/>
            </Switch>
        </Router>
    </Provider>
    , document.querySelector('.container'));

