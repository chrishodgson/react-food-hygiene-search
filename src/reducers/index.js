import { combineReducers } from 'redux';
import EstablishmentsReducer from './reducer_establishments';
import LocalAuthoritiesReducer from './reducer_local_authorities';

const rootReducer = combineReducers({
    establishments: EstablishmentsReducer,
    localAuthorities: LocalAuthoritiesReducer
});

export default rootReducer;
