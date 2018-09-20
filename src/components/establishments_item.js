import React from 'react';

const EstablishmentsItem = ({establishment}) => {
    return (
        <tr>
            <td>{establishment.BusinessName}</td>
            <td>{establishment.BusinessType}</td>
            <td>{establishment.RatingValue}</td>
            <td>{establishment.AddressLine4} {establishment.PostCode}</td>
        </tr>
    );
};

export default EstablishmentsItem;
