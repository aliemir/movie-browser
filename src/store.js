import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import movieBrowserReducer from './modules/movie-browser/movie-browser.reducers';

//the root reducer will serve as the parent of all other reducers
//will add module reducers to the root level here
const rootReducer = combineReducers({
  movieBrowser: movieBrowserReducer
});
//1. actions creators are dispatched to the store
//2. stores call the action creator

//will log info about dispatched action to the console
//incl. the prev state, action detals and the next state
const loggerMiddleware = createLogger();

const store = createStore(
  //reducer
  rootReducer,
  //preloaded state
  undefined,
  //compose simply enables us to apply several store enchancers
  //right now only using applyMiddlware, so this is
  //just future-proofing the app
  compose(
    //middleware can intercept dispatched actions
    //before they react the reducer
    //in order to modify it in some way
    applyMiddleware(
      //thunk allows functions to be returned from
      //action creators
      //so we can do things like dispatch multiple
      //action in a single action creator for async actions
      thunkMiddlware,
      //logger will output the prev state, next state and
      //action details to the console
      loggerMiddleware
    )
  )
);

export default store;
