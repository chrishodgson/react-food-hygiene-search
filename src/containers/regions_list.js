import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchRegions} from '../actions/index';

class RegionsList extends Component {

    componentDidMount() {
        if (!this.props.regions) {
            this.props.fetchRegions();
        }
    }

    renderLinks(region) {
        return (
            <div key={region.id} className="item">
                <Link to={`/region/${region.id}`}>{region.name}</Link>
            </div>
        );
    }

    render() {
        if (!this.props.regions) {
            return <div>Loading regions...</div>;
        }
        return (
            <div className="list">
                {this.props.regions.map(this.renderLinks)}
            </div>
        );
    }
}

function mapStateToProps({regions}) {
    return {regions};
}

export default connect(mapStateToProps, {fetchRegions})(RegionsList);