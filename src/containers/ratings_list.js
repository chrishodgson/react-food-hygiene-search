import React, {Component} from 'react';
import {connect} from 'react-redux';

class RatingsList extends Component {
    renderRatings(establishment) {
        return (
            <tr key={establishment.FHRSID}>
                <td>{establishment.BusinessName}</td>
                <td>{establishment.RatingValue}</td>
            </tr>
        );
    }

    render () {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Establishment</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.establishments.map(this.renderRatings)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({establishments}, ownProps) {

    // console.log(establishments, 'rating_listing mapStateToProps - establishments');
    // console.log(ownProps, 'rating_listing mapStateToProps - ownProps');

    return {establishments};
    //return {establishments: ownProps.match.params.id ? establishments[ownProps.match.params.id] : establishments};
}

export default connect(mapStateToProps)(RatingsList);