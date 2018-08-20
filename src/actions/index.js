import axios from 'axios'

const ROOT_URL = `http://api.ratings.food.gov.uk`;
export const FETCH_RATINGS = 'FETCH_RATINGS';

export function fetchRatings(authority) {
    const url = `${ROOT_URL}/Authorities/basic`;
    const request = axios.get(url);

    return {
        type: FETCH_RATINGS,
        payload: request
    }
}
