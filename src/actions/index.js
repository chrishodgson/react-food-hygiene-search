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

    return dispatch => {
        request.then(data => {
            dispatch({type: FETCH_LOCAL_AUTHORITIES, payload: data});
        });
    };

    // return {
    //     type: FETCH_LOCAL_AUTHORITIES,
    //     payload: request
    // };
}

export function fetchEstablishments(localAuthorityId, callback) {
    const url = `${ROOT_URL}/Establishments?localAuthorityId=${localAuthorityId}&pageNumber=0`;
    // const request = axios.get(url, CONFIG).then(() => callback());
    // return {
    //     type: FETCH_ESTABLISHMENTS,
    //     payload: request
    // };

    const request = axios.get(url, CONFIG);
    return dispatch => {
        request.then(data => {
            dispatch({type: FETCH_ESTABLISHMENTS, payload: data});
        }).then(() => callback());
    };
}