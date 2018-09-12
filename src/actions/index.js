import axios from 'axios';

const ROOT_URL = 'http://api.ratings.food.gov.uk';
const CONFIG = {
    headers: {'x-api-version': '2'}
};

export const FETCH_ESTABLISHMENTS = 'FETCH_ESTABLISHMENTS';
export const FETCH_LOCAL_AUTHORITIES = 'FETCH_LOCAL_AUTHORITIES';
export const FETCH_REGIONS = 'FETCH_REGIONS';

export function fetchRegions() {
    const url = `${ROOT_URL}/Regions/Basic`;
    const request = axios.get(url, CONFIG);

    return dispatch => {
        request.then(data => {
            dispatch({type: FETCH_REGIONS, payload: data});
        });
    };
}

export function fetchLocalAuthorities() {
    const url = `${ROOT_URL}/Authorities/Basic`;
    const request = axios.get(url, CONFIG);

    return dispatch => {
        request.then(data => {
            dispatch({type: FETCH_LOCAL_AUTHORITIES, payload: data});
        });
    };
}

export function fetchEstablishments(localAuthorityId) {
    const url = `${ROOT_URL}/Establishments?localAuthorityId=${localAuthorityId}&pageNumber=0`;
    const request = axios.get(url, CONFIG);

    return dispatch => {
        request.then(data => {
            dispatch({type: FETCH_ESTABLISHMENTS, payload: data});
        });
    };
}