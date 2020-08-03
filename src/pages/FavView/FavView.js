//import things
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FavItem from '../FavItem/FavItem.js';

class FavView extends Component {


    componentDidMount(){
        console.log('in favView')
        this.getFavList();
    }
    // GEt request things
    getFavList = () => {
        axios.get( '/api/favorite' )
            .then( ( response ) => {
            console.log( 'Getting favoriteList from server', response.data );
            this.props.dispatch({ type: "FETCH_FAVORITE", payload: response.data });
            }) //This dispatch is probably not right
            .catch( (error) => {
            console.log( 'Error on GET', error );
            alert("Error on GET favoriteList");
            })
    }

    // Put request things
    



    render() {
        return (
            <div>
                <h1>Your Favorites!</h1>
                {/* map from reduxState to list of added images */}
               {/* {JSON.stringify(this.props.reduxState.imageReducer) } */}
               <ul>
               {this.props.reduxState.favoriteImageReducer.map((item, index) =>{
                   return (
                       <FavItem key={index} item={item}/>
                   )
               })} </ul>

                {/* For each image, have a selec>options with categories */}

            </div>
        );
    }

}


// Makes our reducers available in our component
const mapReduxStateToProps = ( reduxState ) => ({
    reduxState
});

export default connect( mapReduxStateToProps )( FavView );