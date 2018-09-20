import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEstablishments} from '../actions/index';
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

    renderRows(establishment) {
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

console.log(this.props, 'this.props');

        if (!this.props.establishmentsArray) {
            return <p>Loading Establishments...</p>;
        }

        return (
            <div>
                <h3>Establishment Search Results...</h3>
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
                    {this.props.establishmentsArray.map(this.renderRows)}
                    </tbody>
                </table>
            </div>
        );
    }
}

//todo move to parent and make this a component ?
function mapStateToProps({establishments, localAuthorities}, ownProps) {
    const localAuthority = localAuthorities ? localAuthorities[ownProps.match.params.id] : null;
    const establishmentsArray = establishments &&
                                localAuthority.LocalAuthorityIdCode &&
                                establishments[localAuthority.LocalAuthorityIdCode] ?
        Object.values(establishments[localAuthority.LocalAuthorityIdCode]) : null;

    return {establishmentsArray, localAuthority}
}

export default connect(mapStateToProps, {fetchEstablishments})(EstablishmentsList);