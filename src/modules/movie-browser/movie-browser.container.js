import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { AppBar } from 'material-ui';
// e.g. { getTopMovies, ... }
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  componentDidMount() {
    this.props.getTopMovies(1);
  }

  render() {
    const { topMovies } = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);

    return (
      <div>
        <AppBar title="Movie Browser" />
        <Grid>
          <Row>
            <p>Search will go here</p>
          </Row>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  // Map nodes in our state to a properties of our component
  state => ({
    topMovies: state.movieBrowser.topMovies
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);
