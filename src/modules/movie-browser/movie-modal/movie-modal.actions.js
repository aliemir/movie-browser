//type keys
export const keys = {
  OPEN_MOVIE_MODAL: 'OPEN_MOVIE_MODAL',
  CLOSE_MOVIE_MODAL: 'CLOSE_MOVIE_MODAL'
};

//open <MovieModal /> with id
export const openMovieModal = movieId => {
  return {
    type: keys.OPEN_MOVIE_MODAL,
    movieId
  };
};

//close <MovieModal />
export const closeMovieModal = () => {
  return {
    type: keys.CLOSE_MOVIE_MODAL
  };
};
