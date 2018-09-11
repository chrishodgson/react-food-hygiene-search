import React, {Component} from 'react';
import SearchBar from '../containers/not used/search_bar';
import RatingsList from '../containers/not used/ratings_list';

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
