import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchLocalAuthorities} from '../actions/index';

class LocalAuthoritiesList extends Component {

    componentDidMount() {
        if (!this.props.localAuthorities) {
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
        if (!this.props.localAuthorities) {
            return <div>Loading local authorities...</div>;
        }
        return (
            <div>
                <Link to="/">Return to list of Regions</Link>
                <h4>Local Authorities</h4>
                <div className="list">
                    {this.props.localAuthorities.map(this.renderLinks)}
                </div>
            </div>
        );
    }
}

function mapStateToProps({localAuthorities}) {
    return {localAuthorities};
}

export default connect(mapStateToProps, {fetchLocalAuthorities})(LocalAuthoritiesList);