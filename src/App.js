import 'date-fns';
import React from 'react';
// import logo from './logo.svg';
import Apod from './components/Apod';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './App.css';

function App() {

  const [selectedDate, setSelectedDate] = React.useState(Apod.defaultProps.date);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            maxDate={Apod.defaultProps.date}
            margin="normal"
            id="date-picker-inline"
            label="Pick a date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <Apod date={selectedDate} />
        </header>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
