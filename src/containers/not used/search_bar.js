import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchLocalAuthorities, fetchEstablishments} from '../../actions/index';
import history from '../../history';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocalAuthority: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchLocalAuthorities();
    }

    onChange(event) {
        console.log(event.target.value, 'onChange');
        this.setState({selectedLocalAuthority: event.target.value});
        this.props.fetchEstablishments(this.state.selectedLocalAuthority, () => {
            history.push('/authority/' + this.state.selectedLocalAuthority);
        });
    }

    renderlocalAuthorities(localAuthority) {
        return (
            <option
                key={localAuthority.LocalAuthorityId}
                value={localAuthority.LocalAuthorityId}>{localAuthority.Name} ({localAuthority.EstablishmentCount} Establishments)</option>
        );
    }

    render() {
        if (!this.props.localAuthorities) {
            return <div>Loading local authority list...</div>;
        }

console.log(this.props.localAuthorities, 'localAuthorities');

        return (
            <form onSubmit={this.onFormSubmit} className="form-group">
                <select className="form-control"
                        onChange={this.onChange}
                        value={this.state.selectedLocalAuthority}>
                    {this.props.localAuthorities.map(this.renderlocalAuthorities)}
                </select>
            </form>
        );
    }
}

function mapStateToProps({localAuthorities}) {
    return {localAuthorities};
}

export default connect(mapStateToProps, {fetchEstablishments, fetchLocalAuthorities})(SearchBar);