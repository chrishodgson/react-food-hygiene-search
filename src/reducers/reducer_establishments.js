import {FETCH_ESTABLISHMENTS} from '../actions/index';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_ESTABLISHMENTS:
            return action.payload.data.establishments;
    }
    return state;
}