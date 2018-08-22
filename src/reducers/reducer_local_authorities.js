import {FETCH_LOCAL_AUTHORITIES} from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_LOCAL_AUTHORITIES:
            return [action.payload.data.authorities || [], ...state];
    }
    return state;
}