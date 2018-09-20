import _ from 'lodash';
import React, {Component} from 'react';
import EstablishmentsSearch from '../components/establishments_search';
import EstablishmentsList from '../containers/establishments_list';

export default class Establishments extends Component {
    render() {
        const establishmentSearch = _.debounce(term => this.setState({term: term}), 300);
        return (
            <div>
                <EstablishmentsSearch onSearchTermChange={establishmentSearch}/>
                <EstablishmentsList searchTerm={this.state.term}/>
            </div>
        );
    }
}
