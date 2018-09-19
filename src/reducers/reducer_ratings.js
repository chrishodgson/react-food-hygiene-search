import {FETCH_ESTABLISHMENTS} from '../actions/index';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_ESTABLISHMENTS:
            const localAuthorityCode = action.payload.data.establishments.slice(0,1).pop()['LocalAuthorityCode'] || null;
            const establishments = action.payload.data.establishments || null;
            const ratings = null;
            if (establishments) {
                establishments.forEach(establishment => {
                    if (!totals.hasOwnProperty(establishment.RatingValue)) {
                        totals[establishment.RatingValue] = 0;
                    }
                    totals[establishment.RatingValue]++;

                    // if (!businessTypes.hasOwnProperty(establishment.BusinessType)) {
                    //     businessTypes[establishment.BusinessType] = 0;
                    // }
                    // businessTypes[establishment.BusinessType]++;
                });
            }

            console.log(ratings, 'ratings');

            return localAuthorityCode && establishments ?
                {...state, [localAuthorityCode]: ratings} : state;
    }
    return state;
}