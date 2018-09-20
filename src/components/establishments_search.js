import React, {Component} from 'react';

//todo make into a simple const function ?
class EstablishmentsSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    onInputChange(term) {
        this.setState({term: term});
        this.props.onSearchTermChange(term);
    }

    render() {
        return (
            <p>
                <input className="form-control"
                       onChange={event => this.onInputChange(event.target.value)}
                       value={this.state.term}
                       placeholder="Search on Business Name"/>
            </p>
        );
    }
}

export default EstablishmentsSearch;