import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEstablishments} from '../actions/index';
import {Link} from 'react-router-dom';

class EstablishmentsList extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        if (!this.props.establishmentsArray) {
            this.props.fetchEstablishments(id);
        }
    }

    renderLinks(establishment) {
        return (
            <div key={establishment.FHRSID} className="item establishment-item">
                <div>{establishment.BusinessName}</div>
                <div>{establishment.BusinessType}</div>
                <div>Rating: {establishment.RatingValue}</div>
                <div>{establishment.AddressLine4} {establishment.PostCode}</div>
            </div>
        );
    }

    render() {
        if (!this.props.establishmentsArray) {
            return <div>Loading Establishments...</div>;
        }
        return (
            <div>
                <Link to={`/region/${this.props.localAuthority.LocalAuthorityId}}`}>Return to list of Local
                    Authorities</Link>
                <h1>Establishments for {this.props.localAuthority.Name}</h1>
                <div className="list">
                    {this.props.establishmentsArray.map(this.renderLinks)}
                </div>
            </div>
        );
    }
}

function mapStateToProps({establishmentsBylocalAuthority, localAuthorities}, ownProps) {
    const localAuthority = localAuthorities[ownProps.match.params.id];
    const establishments = establishmentsBylocalAuthority && localAuthority ?
        establishmentsBylocalAuthority[localAuthority.LocalAuthorityIdCode] : null;

    const establishmentsArray = establishments ?
        Object.values(establishments).filter(establishment => {
            return establishment.LocalAuthorityCode == localAuthority.LocalAuthorityIdCode;
        }) : establishments;
    return {establishmentsArray, localAuthority}
}

export default connect(mapStateToProps, {fetchEstablishments})(EstablishmentsList);