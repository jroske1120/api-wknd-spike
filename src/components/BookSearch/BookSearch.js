import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = {
  card: {
    width: 350,
    padding: 10,
    margin: 40,
    justifyContent: 'center',
    backgroundColor: 'silver',
  },
  media: {
    height: 250,
    width: 'auto',
    marginLeft: 85
  },
};

class BookSearch extends Component {

  state = {
    search: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit:', this.state.search);
    this.props.dispatch({ type: "FETCH_IMAGE", payload: this.state.search })

  }

  handleChange = (event) => {
    console.log('in search field', event.target.value);
    this.setState({
      search: event.target.value
    })
  }

  addToFavorites = (event, imgSrc) => {
    event.preventDefault();
    console.log('in click with:', imgSrc);
    this.props.dispatch({ type: "ADD_FAVORITE", payload: imgSrc })
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <input type="text" onChange={this.handleChange} placeholder="Search"></input>
          <button type="submit">Search</button>
        </form>
        {this.props.reduxState.searchResultReducer.map((item, index) =>
          <Grid
            key={index}
            container direction="column"
            justify="center"
            alignItems="center">
            <Card
              variant="outlined"
              className={classes.card} >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={item.volumeInfo.imageLinks.thumbnail}
                  alt={item.volumeInfo.title} />
                <CardContent>
                  <Typography
                    gutterBottom variant="h5" component="h2">
                    {item.volumeInfo.title}
                  </Typography>
                  <hr color="black" />
                  <Typography
                    variant="body2" component="p">
                    {item.volumeInfo.description}
                  </Typography>
                  <hr />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">

                  </Typography>
                </CardContent>
              </CardActionArea>
              <button><a
                href={item.accessInfo.webReaderLink}
                rel="noopener noreferrer"
                target="_blank">
                Read it!
                        </a></button>
            </Card>
          </Grid>


        )
        }
      </div>
    );
  }

}
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(BookSearch));
