import React, { Component } from 'react';
import { connect } from 'react-redux';

class FavItem extends Component {

    handleChange = (event, type) => {
        console.log('in handleChange', event.target.value);
        // this.props.dispatch({
        //   type: "ADD_FEEDBACK",
        //   payload: {
        //       category: event.target.value
        //   }
        // })
      }
    
      handleSubmit = () => {
          console.log('in handleSubmit');
        // conditional that will only advance to next page
        // if a response is provided
        // this.props.dispatch
      }

    render() {
        return (
            <li>
                {/* {JSON.stringify(this.props.item)} */}
                <img src={this.props.item.url} alt="favorite"/>
                <br></br>
                <select
                // value={this.props.reduxState.REDUCERWHEREWEPUTFAVS.category_id}
                onChange={this.handleChange}>
                    <option value="1">funny</option>
                    <option value="2">cohort</option>
                    <option value="3">cartoon</option>
                    <option value="4">nsfw</option>
                    <option value="5">meme</option>
                </select>
                <button onClick={this.handleSubmit}>Add to this category</button>
            </li>

        )
    }
}

// do we care about redux here. - yes, because... we have to connect to other stuff. yes...
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(FavItem);
