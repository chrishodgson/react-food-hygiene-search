import React from 'react';
import EstablishmentItem from './establishments_item';
import {Link} from "react-router-dom";

const EstablishmentsList = props => {

    if (!props.search) {
        return null;
    }

    if (!props.results.length) {
        return <p>No results found matching '{props.search}'</p>;
    }

    const establishmentItems = props.results.map(establishment => {
        return (
            <EstablishmentItem key={establishment.FHRSID} establishment={establishment}/>
        )
    });

    return (
        <div>
            <p>{props.results.length} results found matching '{props.search}'</p>

            <p>
                <Link className={props.previous ? 'prev' : 'prev disable'} to='#' onClick={props.previous}>Previous</Link>
                <Link className={props.previous ? 'next' : 'next disable'} to='#' onClick={props.next}>Next</Link>
            </p>

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