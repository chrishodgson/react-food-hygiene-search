import { combineReducers } from 'redux';
import EstablishmentsReducer from './reducer_establishments';
import LocalAuthoritiesReducer from './reducer_local_authorities';
import RegionsReducer from './reducer_regions';
import RatingsReducer from './reducer_ratings';

const rootReducer = combineReducers({
    ratings: RatingsReducer,
    establishments: EstablishmentsReducer,
    localAuthorities: LocalAuthoritiesReducer,
    regions: RegionsReducer
});

export default rootReducer;
