import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEstablishments} from '../actions/index';
import {Link} from 'react-router-dom';
import history from "../history";

class EstablishmentsList extends Component {

    componentDidMount() {
        if (!this.props.region || !this.props.localAuthority) {
            history.push('/');
        }
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
            return <p>Loading Establishments...</p>;
        }

        return (
            <div>
                <Link to={`/region/${this.props.region.id}`}>Back to list of Local Authorities
                    ({this.props.region.name})</Link>
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

function mapStateToProps({establishments, localAuthorities, regions}, ownProps) {
    const localAuthority = localAuthorities[ownProps.match.params.id];
    const regionArray = regions ?
        Object.values(regions).filter(region => region.name === localAuthority.RegionName) : null;
    const region = regionArray.length ? regionArray.pop() : null;
    const establishmentsArray = establishments &&
                                localAuthority.LocalAuthorityIdCode &&
                                establishments[localAuthority.LocalAuthorityIdCode] ?
        Object.values(establishments[localAuthority.LocalAuthorityIdCode]) : null;

    return {establishmentsArray, localAuthority, region}
}

export default connect(mapStateToProps, {fetchEstablishments})(EstablishmentsList);