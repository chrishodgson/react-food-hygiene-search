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
                <Link to={`/localAuthority/${localAuthority.LocalAuthorityId}`}>{localAuthority.Name}</Link>
            </div>
        );
    }

    render() {
        if (!this.props.localAuthoritiesArray) {
            return <div>Loading local authorities...</div>;
        }
        return (
            <div>
                <Link to="/">Return to list of Regions</Link>
                <h1>Local Authorities</h1>
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
console.log(localAuthority, region.name);
            return region.name == localAuthority.RegionName
        }) : localAuthorities;
    return {localAuthoritiesArray}
}

export default connect(mapStateToProps, {fetchLocalAuthorities})(LocalAuthoritiesList);