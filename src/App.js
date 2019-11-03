import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import React, { Component } from 'react';
import './App.css';
// import logo from './logo.svg';
import ApodMedia from './components/Apod/ApodMedia';
import { todayInCorrectTimeZone } from './components/Apod/utils';
import DatePicker from './components/DatePicker/DatePicker';

class App extends Component {

  apodSafeToday = todayInCorrectTimeZone;

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: this.apodSafeToday,
    };
  }

  dateCallback = selectedDate => {
    this.setState({
      selectedDate,
    });
  }

  render() {
    return (
      <div className="App">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1>NASA APOD Image Browser</h1>
            <DatePicker parentCallback={this.dateCallback} maxDate={this.apodSafeToday} />
            <ApodMedia date={this.state.selectedDate} />
          </header>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default App;
