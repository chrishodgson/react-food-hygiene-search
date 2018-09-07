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

        this.onChange = this.onChange.bind(this);
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

    onChange(event) {
        console.log(event.target.value, 'onChange');
        this.setState({selectedLocalAuthority: event.target.value});
    }

    renderlocalAuthorities(localAuthority) {
        return (
            <option
                key={localAuthority.LocalAuthorityId}
                value={localAuthority.LocalAuthorityId}>{localAuthority.Name}</option>
        );
    }

    render() {
        if (!this.props.localAuthorities) {
            return <div>Loading local authority list...</div>;
        }

        return (
            <form onSubmit={this.onFormSubmit} className="form-group">
                <select className="form-control"
                        onChange={this.onChange}
                        value={this.state.selectedLocalAuthority}>
                    {this.props.localAuthorities.map(this.renderlocalAuthorities)}
                </select>
            </form>
        );

        // return (
        //     <form onSubmit={this.onFormSubmit} className="input-group">
        //         <input className="form-control"
        //                value={this.state.selectedLocalAuthority}
        //                onChange={this.onInputChange}/>
        //         <span className="input-group-btn">
        //             <button type="submit" className="btn btn-secondary">Submit</button>
        //         </span>
        //     </form>
        // );
    }
}

function mapStateToProps({localAuthorities}) {
    return {localAuthorities};
}

export default connect(mapStateToProps, {fetchEstablishments, fetchLocalAuthorities})(SearchBar);