import React, {Component} from 'react';
import {connect} from 'react-redux';

class RatingsList extends Component {

    componentDidMount() {
        console.log('RatingsList.componentDidMount');
    }

    renderRatings(establishment) {
        return (
            <tr key={establishment.FHRSID}>
                <td>{establishment.BusinessName}</td>
                <td>{establishment.RatingValue === 1 ? 'Yes' : 'No'}</td>
                <td>{establishment.RatingValue === 2 ? 'Yes' : 'No'}</td>
                <td>{establishment.RatingValue === 3 ? 'Yes' : 'No'}</td>
                <td>{establishment.RatingValue === 4 ? 'Yes' : 'No'}</td>
                <td>{establishment.RatingValue === 5 ? 'Yes' : 'No'}</td>
                <td>{establishment.RatingValue === 'awaiting inspection' ? 'Yes' : 'No'}</td>
            </tr>
        );
    }

    render () {

        console.log('RatingsList.render');

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Local Authority</th>
                    <th>Rating 1</th>
                    <th>Rating 2</th>
                    <th>Rating 3</th>
                    <th>Rating 4</th>
                    <th>Rating 5</th>
                    <th>Other</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.establishments.map(this.renderRatings)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({establishments}) {

    console.log(establishments, 'RatingsList.mapStateToProps');

    return {
        establishments: establishments
    };
}

export default connect(mapStateToProps)(RatingsList);