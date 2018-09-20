import React, {Component} from 'react';
import EstablishmentsList from '../components/establishments_list';
import EstablishmentsSearch from '../components/establishments_search';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import history from "../history";
import {fetchEstablishments} from "../actions";

class Establishments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: '',
            results: []
        };
    }

    componentDidMount() {
        if (!this.props.region || !this.props.localAuthority) {
            history.push('/');
        }
        const {id} = this.props.match.params;
        if (!this.props.establishmentsArray) {
            this.props.fetchEstablishments(id);
        }
    }

    //todo paginate
    handleSearch(term) {
        this.setState({
            term: term
        });
        const pattern = new RegExp(term, 'gi');
        const establishments = term ? this.props.establishmentsArray.filter(establishment => {
            return pattern.test(establishment.BusinessName);
        }) : [];

        this.setState({
            results: establishments
        });
    }

    render() {
        if (!this.props.establishmentsArray) {
            return <div className="loading">Loading establishments...</div>
        }

        const establishmentSearch = _.debounce(term => this.handleSearch(term), 300);

        return (
            <div>
                <Link className="back" to={`/region/${this.props.region.id}`}>
                    Back to list of Local Authorities for {this.props.region.name}
                </Link>

                <h1>Establishments for {this.props.localAuthority.Name}</h1>

                <EstablishmentsSearch onSearchTermChange={establishmentSearch}/>
                <EstablishmentsList establishments={this.state.results} search={this.state.term}/>
            </div>
        );
    }
}

function mapStateToProps({regions, localAuthorities, establishments}, ownProps) {
    const localAuthority = localAuthorities ? localAuthorities[ownProps.match.params.id] : null;
    const regionArray = regions && localAuthority ?
        Object.values(regions).filter(region => region.name === localAuthority.RegionName) : null;
    const establishmentsArray = establishments &&
    localAuthority.LocalAuthorityIdCode &&
    establishments[localAuthority.LocalAuthorityIdCode] ?
        Object.values(establishments[localAuthority.LocalAuthorityIdCode]) : null;
    const region = regionArray ? regionArray.pop() : null;

    return {localAuthority, establishmentsArray, region}
}

export default connect(mapStateToProps, {fetchEstablishments})(Establishments);
