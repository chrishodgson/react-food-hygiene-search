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
            <p>Displaying results {props.start} to {props.end} of {props.total} found matching
                '{props.search}'. Page: {props.pageNumber} of {props.numPages}.</p>
            <p>
                {props.previous ? <Link className='prev' to='#' onClick={props.previous}>&laquo; Previous</Link> : ''}
                {props.next ? <Link className='next' to='#' onClick={props.next}>Next &raquo;</Link> : ''}
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