import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEstablishments} from '../actions/index';
import {Link} from 'react-router-dom';
import history from "../history";

class LocalAuthorityRatingsList extends Component {

    componentDidMount() {
        if (!this.props.region || !this.props.localAuthority) {
            history.push('/');
        }
        const {id} = this.props.match.params;
        if (!this.props.establishments) {
            this.props.fetchEstablishments(id);
        }
    }

    renderLinks(rating) {
        return (
            <tr key={rating.RatingValue}>
                <td>{rating.RatingValue}</td>
                <td>{rating.Count}</td>
            </tr>
        );
    }

    render() {
        if (!this.props.ratingsArray) {
            return <p>Loading Ratings...</p>;
        }

        return (
            <div>
                <Link to={`/region/${this.props.region.id}`}>Back to list of Local Authorities
                    ({this.props.region.name})</Link>
                <h1>Ratings for {this.props.localAuthority.Name}</h1>
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.ratingsArray.map(this.renderLinks)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps({ratings, localAuthorities, regions}, ownProps) {
    const localAuthority = localAuthorities ? localAuthorities[ownProps.match.params.id] : null;
    const regionArray = regions  && localAuthority ?
        Object.values(regions).filter(region => region.name === localAuthority.RegionName) : null;
    const region = regionArray && regionArray ? regionArray.pop() : null;
    const ratingsArray = ratings &&
                         localAuthority.LocalAuthorityIdCode &&
                         ratings[localAuthority.LocalAuthorityIdCode] ?
        Object.values(ratings[localAuthority.LocalAuthorityIdCode]) : null;

    return {ratingsArray, localAuthority, region}
}

export default connect(mapStateToProps, {fetchEstablishments})(LocalAuthorityRatingsList);