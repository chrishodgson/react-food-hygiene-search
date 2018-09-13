import _ from "lodash";
import {FETCH_REGIONS} from '../actions/index';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_REGIONS:
            return _.mapKeys(action.payload.data.regions, 'id');
    }
    return state;
}