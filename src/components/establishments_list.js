import React from 'react';
import EstablishmentItem from './establishments_item';

const EstablishmentsList = props => {

    if (!props.search) {
        return null;
    }

    if (!props.establishments.length) {
        return <p>No results found matching '{props.search}'</p>;
    }

    const establishmentItems = props.establishments.map(establishment => {
        return (
            <EstablishmentItem key={establishment.FHRSID} establishment={establishment}/>
        )
    });

    return (
        <div>
            <p>{props.establishments.length} results found matching '{props.search}'</p>
            <table className="table table-condensed">
                <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Business Type</th>
                    <th>Rating</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {establishmentItems}
                </tbody>
            </table>
        </div>
    );
};

export default EstablishmentsList;