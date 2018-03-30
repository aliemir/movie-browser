import React, { Component } from 'react';
import MovieBrowser from './modules/movie-browser/movie-browser.container';
//import MuiThemeProvier from 'material-ui/styles/MuiThemeProvider';
import { MuiThemeProvider } from 'material-ui';

class App extends Component {
  render() {
    return (
      //Provides the Material UI theme to the child Components
      <MuiThemeProvider>
        <MovieBrowser />
      </MuiThemeProvider>
    );
  }
}

export default App;
