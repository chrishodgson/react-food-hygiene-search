import React from 'react';

const EstablishmentsSearch = props => {
    return (
        <p>
            <input className="form-control"
                   placeholder="Search on Business Name"
                   onChange={event => props.onSearchTermChange(event.target.value)}/>
        </p>
    );
};

export default EstablishmentsSearch;