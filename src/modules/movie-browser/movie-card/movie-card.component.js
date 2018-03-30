import React from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui';

//these are inline styles
//you can pass styles as objects using this convention
const styles = {
  CardTitle: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  CardMedia: {
    maxHeight: 394,
    overflow: 'hidden'
  },
  card: {
    cursor: 'pointer',
    height: 400,
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%'
  }
};

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    //track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false
    };
  }

  render() {
    const { movie, openMovieModal } = this.props;
    //the subtitle wond render if its null
    const subtitle = this.state.isMouseOver ? movie.overview : null;

    return (
      <Card
        style={styles.card}
        onMouseOver={() => this.setState({ isMouseOver: true })}
        onMouseLeave={() => this.setState({ isMouseOver: false })}
      >
        {/* <CardTitle title={<div style={styles.cardTitle}>{movie.title}</div>} /> */}
        <CardMedia
          style={styles.CardMedia}
          overlay={<CardTitle title={movie.title} subtitle={subtitle} />}
        >
          <img style={styles.bgImage} src={movie.poster_path} />
        </CardMedia>
      </Card>
    );
  }
}

export default MovieCardComponent;
