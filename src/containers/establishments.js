// import _ from 'lodash';
import React, {Component} from 'react';
// import EstablishmentsSearch from '../components/establishments_search';
import EstablishmentsList from './establishments_list';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

export default class Establishments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    render() {
        // const establishmentSearch = _.debounce(term => this.setState({term: term}), 300);
        return (
            <div>
                <Link to={`/region/${this.props.region.id}`}>Back to list of Local Authorities
                    ({this.props.region.name})</Link>

                <h1>Establishments for {this.props.localAuthority.Name}</h1>

                {/*<EstablishmentsSearch onSearchTermChange={establishmentSearch}/>*/}
                <EstablishmentsList searchTerm={this.state.term}/>
            </div>
        );
    }
}
function mapStateToProps({regions, localAuthorities}, ownProps) {
    const localAuthority = localAuthorities ? localAuthorities[ownProps.match.params.id] : null;
    const regionArray = regions ?
        Object.values(regions).filter(region => region.name === localAuthority.RegionName) : null;
    const region = regionArray ? regionArray.pop() : null;
    return {localAuthority, region}
}

export default connect(mapStateToProps)(Establishments);
