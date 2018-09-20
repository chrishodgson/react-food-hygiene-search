import React, {Component} from 'react';

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
                <h3>Search Establishments</h3>
                <input className="form-control"
                        onChange={event => this.onInputChange(event.target.value)}
                        value={this.state.term} />
            </div>
        );
    }
}

export default EstablishmentsSearch;