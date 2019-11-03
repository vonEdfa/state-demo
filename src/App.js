import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import React from 'react';
import './App.css';
import Apod from './components/Apod/Apod';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#09d3ac',
    }
  }
});

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Apod />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </div>
);

export default App;
