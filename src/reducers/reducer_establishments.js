import {FETCH_ESTABLISHMENTS} from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ESTABLISHMENTS:
            return [action.payload.data.establishments || [], ...state];
    }
    return state;
}