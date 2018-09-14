import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchLocalAuthorities} from '../actions/index';

class LocalAuthoritiesList extends Component {

    componentDidMount() {
        if (!this.props.localAuthoritiesArray) {
            this.props.fetchLocalAuthorities();
        }
    }

    renderLinks(localAuthority) {
        return (
            <div key={localAuthority.LocalAuthorityId} className="item">
                {/*<Link to={`/localAuthority/${localAuthority.LocalAuthorityId}`}>{localAuthority.Name}</Link>*/}
                <Link to={`/localAuthorityRating/${localAuthority.LocalAuthorityId}`}>{localAuthority.Name}</Link>
            </div>
        );
    }

    render() {
        if (!this.props.localAuthoritiesArray) {
            return <p>Loading Local Authorities...</p>;
        }
        return (
            <div>
                <Link to="/">Return to list of Regions</Link>
                <h1>Local Authorities for {this.props.region.name}</h1>
                <div className="list">
                    {this.props.localAuthoritiesArray.map(this.renderLinks)}
                </div>
            </div>
        );
    }
}

function mapStateToProps({localAuthorities, regions}, ownProps) {
    const region = regions[ownProps.match.params.id];
    const localAuthoritiesArray = localAuthorities ?
        Object.values(localAuthorities).filter(localAuthority => {
            return localAuthority.RegionName == region.name;
        }) : null;
    return {localAuthoritiesArray, region}
}

export default connect(mapStateToProps, {fetchLocalAuthorities})(LocalAuthoritiesList);