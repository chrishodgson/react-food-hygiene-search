import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRatings} from '../actions'

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {term: ''};

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFormSubmit() {
        event.preventDefault();
        this.props.fetchRatings(this.state.term)
    }

    onInputChange(event) {
        this.setState({term: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className='input-group'>
                <input
                    placeholder='Get the food hygiene ratings for a Local Authority'
                    value={this.state.term}
                    className='form-control'
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRatings}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);