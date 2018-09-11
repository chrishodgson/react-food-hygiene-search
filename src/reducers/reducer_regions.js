import {FETCH_REGIONS} from '../actions/index';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_REGIONS:
            return action.payload.data.regions;
    }
    return state;
}