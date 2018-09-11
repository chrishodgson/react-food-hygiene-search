import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEstablishments} from '../actions/index';

class EstablishmentsList extends Component {

    componentDidMount() {
        if (!this.props.establishments) {
            this.props.fetchEstablishments();
        }
    }

    renderLinks(establishment) {
        return (
            <div key={establishment.FHRSID} className="item">
                <div>{establishment.BusinessName}</div>
                <div>BusinessType: {establishment.BusinessType}</div>
                <div>Address: {establishment.AddressLine1}</div>
                <div>Address: {establishment.AddressLine2}</div>
                <div>Address: {establishment.AddressLine3}</div>
                <div>Address: {establishment.AddressLine4}</div>
                <div>Address: {establishment.PostCode}</div>
                <div>RatingValue: {establishment.RatingValue}</div>
            </div>
        );
    }

    render() {
        if (!this.props.establishments) {
            return <div>Loading establishments...</div>;
        }
        return (
            <div className="list">
                {this.props.establishments.map(this.renderLinks)}
            </div>
        );
    }
}

function mapStateToProps({establishments}) {
    return {establishments};
}

export default connect(mapStateToProps, {fetchEstablishments})(EstablishmentsList);