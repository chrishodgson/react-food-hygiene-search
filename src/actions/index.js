import axios from 'axios';

const ROOT_URL = 'http://api.ratings.food.gov.uk';
const CONFIG = {
    headers: {'x-api-version': '2'}
};

export const FETCH_ESTABLISHMENTS = 'FETCH_ESTABLISHMENTS';
export const FETCH_LOCAL_AUTHORITIES = 'FETCH_LOCAL_AUTHORITIES';

export function fetchLocalAuthorities() {
    const url = `${ROOT_URL}/Authorities/Basic`;
    const request = axios.get(url, CONFIG);

    return {
        type: FETCH_LOCAL_AUTHORITIES,
        payload: request
    };
}

export function fetchEstablishments(localAuthorityId) {
    const url = `${ROOT_URL}/Establishments?localAuthorityId=${localAuthorityId}`;
    const request = axios.get(url, CONFIG);

    return {
        type: FETCH_ESTABLISHMENTS,
        payload: request
    };
}