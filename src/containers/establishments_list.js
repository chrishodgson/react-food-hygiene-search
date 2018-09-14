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
            <tr key={establishment.FHRSID}>
                <td>{establishment.BusinessName}</td>
                <td>{establishment.BusinessType}</td>
                <td>{establishment.RatingValue}</td>
                <td>{establishment.AddressLine4} {establishment.PostCode}</td>
            </tr>
        );
    }

    render() {
        if (!this.props.establishmentsArray) {
            return <div>Loading Establishments...</div>;
        }

        const link = `/region/${this.props.region.id}`;
        return (
            <div>
                <Link to={link}>Return to list of Local Authorities for {this.props.region.name}</Link>
                <h1>Establishments for {this.props.localAuthority.Name}</h1>
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
                    {this.props.establishmentsArray.map(this.renderLinks)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps({establishmentsBylocalAuthority, localAuthorities, regions}, ownProps) {

    const localAuthority = localAuthorities[ownProps.match.params.id];
    const regionArray = regions ?
        Object.values(regions).filter(region => {
            return region.name == localAuthority.RegionName;
        }) : regions;
    const region = regionArray.pop();

    const establishments = establishmentsBylocalAuthority && localAuthority ?
        establishmentsBylocalAuthority[localAuthority.LocalAuthorityIdCode] : null;

    const establishmentsArray = establishments ?
        Object.values(establishments).filter(establishment => {
            return establishment.LocalAuthorityCode == localAuthority.LocalAuthorityIdCode;
        }) : establishments;
    return {establishmentsArray, localAuthority, region}
}

export default connect(mapStateToProps, {fetchEstablishments})(EstablishmentsList);