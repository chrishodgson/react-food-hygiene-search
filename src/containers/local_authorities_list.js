import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchLocalAuthorities} from '../actions/index';
import history from "../history";

class LocalAuthoritiesList extends Component {

    componentDidMount() {
        if (!this.props.region) {
            history.push('/');
        }
        if (!this.props.localAuthoritiesArray) {
            this.props.fetchLocalAuthorities();
        }
    }

    renderLinks(localAuthority) {
        return (
            <div key={localAuthority.LocalAuthorityId} className="item">
                <div>{localAuthority.Name}</div>
                <Link to={`/localAuthority/${localAuthority.LocalAuthorityId}`}>Search</Link>
                <span>|</span>
                <Link to={`/localAuthorityRating/${localAuthority.LocalAuthorityId}`}>Summary</Link>
            </div>
        );
    }

    render() {
        if (!this.props.localAuthoritiesArray) {
            return <p>Loading Local Authorities...</p>;
        }
        return (
            <div>
                <Link to="/">Back to list of Regions</Link>
                <h1>Local Authorities for {this.props.region.name}</h1>
                <div className="list">
                    {this.props.localAuthoritiesArray.map(this.renderLinks)}
                </div>
            </div>
        );
    }
}

function mapStateToProps({localAuthorities, regions}, ownProps) {
    const region = regions ? regions[ownProps.match.params.id] : null;
    const localAuthoritiesArray = localAuthorities && region ?
        Object.values(localAuthorities).filter(localAuthority => localAuthority.RegionName === region.name) : null;
    return {localAuthoritiesArray, region}
}

export default connect(mapStateToProps, {fetchLocalAuthorities})(LocalAuthoritiesList);