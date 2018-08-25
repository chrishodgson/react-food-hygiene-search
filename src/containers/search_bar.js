import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchLocalAuthorities, fetchEstablishments} from '../actions/index';
import history from '../history';

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
        this.props.fetchLocalAuthorities();
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchEstablishments(this.state.selectedLocalAuthority, () => {
            history.push('/authority/' + this.state.selectedLocalAuthority);
        });
    }

    onInputChange(event) {
        this.setState({selectedLocalAuthority: event.target.value});
    }

    render() {
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
    return {localAuthorities};
}

export default connect(mapStateToProps, {fetchEstablishments, fetchLocalAuthorities})(SearchBar);