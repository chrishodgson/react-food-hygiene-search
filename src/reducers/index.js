import { combineReducers } from 'redux';
import EstablishmentsReducer from './reducer_establishments';
import LocalAuthoritiesReducer from './reducer_local_authorities';
import RegionsReducer from './reducer_regions';

const rootReducer = combineReducers({
    establishments: EstablishmentsReducer,
    localAuthorities: LocalAuthoritiesReducer,
    regions: RegionsReducer
});

export default rootReducer;
