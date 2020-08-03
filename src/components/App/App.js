import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import BookSearch from '../BookSearch/BookSearch';
import {connect} from 'react-redux'
import FavView from '../../pages/FavView/FavView';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Book Search!</h1>
        <Router>
          <Route exact path="/" component={BookSearch}/>
        </Router>
      </div>
    );
  }
}



export default connect()(App);
