import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchLocalAuthorities, fetchEstablishments} from '../actions/index';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocalAuthority: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        console.log('SearchBar.componentDidMount');
        this.props.fetchLocalAuthorities();
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchEstablishments(this.state.selectedLocalAuthority);
        //this.setState({localAuthorities: []});
    }

    onInputChange(event) {
        this.setState({selectedLocalAuthority: event.target.value});
    }

    render() {

        console.log('SearchBar.render');

        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input className="form-control"
                       value={this.state.selectedLocalAuthority}
                       onChange={this.onInputChange}/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}

function mapStateToProps({localAuthorities}) {
    console.log(localAuthorities, 'SearchBar.mapStateToProps');
    return {localAuthorities: localAuthorities};
}

export default connect(mapStateToProps, {fetchEstablishments, fetchLocalAuthorities})(SearchBar);