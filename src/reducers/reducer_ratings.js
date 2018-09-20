import {FETCH_ESTABLISHMENTS} from '../actions/index';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_ESTABLISHMENTS:
            const localAuthorityCode = action.payload.data.establishments.slice(0,1).pop()['LocalAuthorityCode'] || null;
            const establishments = action.payload.data.establishments || null;
            let ratings = [];

            if (establishments) {
                let totals = {};
                establishments.forEach(establishment => {
                    if (!totals.hasOwnProperty(establishment.RatingValue)) {
                        totals[establishment.RatingValue] = 0;
                    }
                    totals[establishment.RatingValue]++;
                });
                for(const key in totals) {
                    ratings.push({
                        "RatingValue": key,
                        "Count": totals[key]
                    });
                }
                ratings = _.sortBy(ratings, 'Count').reverse();
            }

            return localAuthorityCode && establishments ?
                {...state, [localAuthorityCode]: ratings} : state;
    }
    return state;
}