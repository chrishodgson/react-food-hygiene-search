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
            establishments: [],
            pagedResults: [],
            perPage: 10,
            pageNumber: 0
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.setNextPage = this.setNextPage.bind(this);
        this.setPreviousPage = this.setPreviousPage.bind(this);
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

    handleSearch(term) {
        const pattern = new RegExp(term, 'gi');
        const establishments = term ? this.props.establishmentsArray.filter(establishment => {
            return pattern.test(establishment.BusinessName);
        }) : [];

        this.setState({
            term: term,
            pageNumber: 0,
            establishments: establishments
        }, () => this.setNextPage());
    }

    setNextPage() {
        this.setResults(this.state.pageNumber + 1);
    }

    setPreviousPage() {
        this.setResults(this.state.pageNumber - 1);
    }

    setResults(pageNumber) {
        const start = (pageNumber===1 ? 0 : (pageNumber-1) * this.state.perPage);
        //const showPrev = this.state.establishments.count() >= start;
        //const showNext = this.state.establishments.count() <= end;
        const end = start + this.state.perPage;
        this.setState({
            pageNumber: pageNumber,
            pagedResults: this.state.establishments.slice(start, end)
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
                <EstablishmentsList results={this.state.pagedResults}
                                    search={this.state.term}
                                    next={this.setNextPage}
                                    previous={this.setPreviousPage}/>
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
