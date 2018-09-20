import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class EstablishmentsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    onInputChange(term) {
        console.log(term, 'onInputChange');
        this.setState({term: term});
        this.props.onSearchTermChange(term);
    }

    render() {
        return (
            <div>
                <Link to={`/region/${this.props.region.id}`}>Back to list of Local Authorities
                    ({this.props.region.name})</Link>
                <h1>Search Establishments in {this.props.localAuthority.Name}</h1>

                <input className="form-control"
                        onChange={event => this.onInputChange(event.target.value)}
                        value={this.state.term} />
            </div>
        );
    }
}

function mapStateToProps({regions}, ownProps) {
    const localAuthority = localAuthorities[ownProps.match.params.id];
    const regionArray = regions ?
        Object.values(regions).filter(region => region.name === localAuthority.RegionName) : null;
    const region = regionArray ? regionArray.pop() : null;
    return {localAuthority, region}
}

export default connect(mapStateToProps)(EstablishmentsSearch);