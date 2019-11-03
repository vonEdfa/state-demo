import { KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class DatePicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  handleDateChange = date => {
    this.setState({ date });
    this.props.parentCallback(date);
  };

  render() {
    return (
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        maxDate={this.props.maxDate}
        minDate={this.props.minDate}
        margin="normal"
        id="date-picker-inline"
        label="Pick a date"
        value={this.state.date}
        onChange={this.handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    );
  }

};

DatePicker.defaultProps = {
  parentCallback: () => null,
  maxDate: null,
  minDate: null,
};

DatePicker.propTypes = {
  parentCallback: PropTypes.func,
  maxDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ])
};

export default DatePicker;