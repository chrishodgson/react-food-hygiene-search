import {FETCH_ESTABLISHMENTS} from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ESTABLISHMENTS:

console.log(action.payload.data.establishments, 'reducer_establishments - action.payload.data.establishments');

            // return action.payload.data.establishments;

            // const key = action.payload.data.slice(1,1).pop().localAuthorityBusinessId;
            // return {...state, [key]: action.payload.data.establishments};
            return action.payload.data.establishments;
    }
    return state;
}