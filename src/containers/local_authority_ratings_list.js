import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEstablishments} from '../actions/index';
import {Link} from 'react-router-dom';
import _ from "lodash";
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

function mapStateToProps({establishments, localAuthorities, regions}, ownProps) {
    const localAuthority = localAuthorities ? localAuthorities[ownProps.match.params.id] : null;
    const regionArray = regions  && localAuthority ?
        Object.values(regions).filter(region => region.name === localAuthority.RegionName) : null;
    const region = regionArray && regionArray ? regionArray.pop() : null;
    const establishmentsArray = establishments &&
                                localAuthority.LocalAuthorityIdCode &&
                                establishments[localAuthority.LocalAuthorityIdCode] ?
        Object.values(establishments[localAuthority.LocalAuthorityIdCode]) : null;

    // todo move to reducer and break down by business type
    let ratingsArray = null;
    if (establishmentsArray) {
        const ratings = {};
        establishmentsArray.forEach(establishment => {
            if (!ratings.hasOwnProperty(establishment.RatingValue)) {
                ratings[establishment.RatingValue] = 0;
            }
            ratings[establishment.RatingValue]++;
        });
        ratingsArray = [];
        for(const key in ratings) {
            ratingsArray.push({
                "RatingValue": key,
                "Count": ratings[key]
            });
        }
        ratingsArray = _.sortBy(ratingsArray, 'Count').reverse();
    }
    return {ratingsArray, localAuthority, region}
}

export default connect(mapStateToProps, {fetchEstablishments})(LocalAuthorityRatingsList);