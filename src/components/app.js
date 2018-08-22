import React, {Component} from 'react';
import SearchBar from '../containers/search_bar';
import RatingsList from '../containers/ratings_list';

export default class App extends Component {
    render() {
        return (
            <div>
                <SearchBar/>
                <RatingsList/>
            </div>
        );
    }
}
