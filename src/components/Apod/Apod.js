import React, { Component } from 'react';
import ApodMedia from './ApodMedia';
import * as utils from './utils';
import DatePicker from '../DatePicker/DatePicker';

class Apod extends Component {

  apodSafeToday = utils.todayInCorrectTimeZone;
  apodMinDate = utils.minSupportedDate;
  apodMaxDate = utils.maxSupportedDate;

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
      <>
        <h1>NASA APOD Image Browser</h1>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ApodMedia date={this.state.selectedDate} />
          <div
            style={{
              width: '25%',
            }}
          >
            <DatePicker
              parentCallback={this.dateCallback}
              maxDate={this.apodMaxDate}
              minDate={this.apodMinDate}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Apod;
