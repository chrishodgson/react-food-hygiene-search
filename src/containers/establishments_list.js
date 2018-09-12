import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEstablishments} from '../actions/index';
import {Link} from 'react-router-dom';

class EstablishmentsList extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        if (!this.props.establishments) {
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
        if (!this.props.establishments) {
            return <div>Loading establishments...</div>;
        }
        return (
            <div>
                {/*todo use specific region id for link*/}
                {/*<Link to={`/region/1`}>List of Local Authorities</Link>*/}
                <h4>Establishments</h4>
                <div className="list">
                    {this.props.establishments.map(this.renderLinks)}
                </div>
            </div>
        );
    }
}

function mapStateToProps({establishments, localAuthoritiesMap}, ownProps) {
    // return {establishments: establishments[ownProps.match.params.id]}

console.log(establishments, 'EstablishmentsList - mapStateToProps');
console.log(localAuthoritiesMap, 'localAuthoritiesMap - mapStateToProps');

    return {establishments: establishments}
}

export default connect(mapStateToProps, {fetchEstablishments})(EstablishmentsList);