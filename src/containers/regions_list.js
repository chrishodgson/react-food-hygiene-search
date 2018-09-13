import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchRegions} from '../actions/index';

class RegionsList extends Component {

    componentDidMount() {
        if (!this.props.regionsArray) {
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
        if (!this.props.regionsArray) {
            return <div>Loading regions...</div>
        }

        return (
            <div>
                <h1>Regions</h1>
                <div className="list">
                    {this.props.regionsArray.map(this.renderLinks)}
                </div>
            </div>
        );
    }
}

function mapStateToProps({regions}) {
    const regionsArray = regions ? Object.values(regions) : regions;
    return {regionsArray}
}

export default connect(mapStateToProps, {fetchRegions})(RegionsList);