import React, { Component } from 'react';
import ApodMedia from './ApodMedia';
import * as utils from './utils';
import DatePicker from '../DatePicker/DatePicker';

class Apod extends Component {

  apodBaseUrl = 'https://api.nasa.gov/planetary/apod';
  key = process.env.REACT_APP_NASA_API_TOKEN;

  apodSafeToday = utils.todayInCorrectTimeZone;
  apodMinDate = utils.minSupportedDate;
  apodMaxDate = utils.maxSupportedDate;

  constructor(props) {
    super(props);

    this.state = {
      data: {
        copyright: '',
        date: '',
        explanation: '',
        hdurl: '',
        media_type: '',
        service_version: '',
        title: '',
        url: '',
      },
      selectedDate: this.apodSafeToday,
    };
  }

  fetchImageData(date) {
    if (!date) {
      date = utils.todayInCorrectTimeZone;
    }
    let image = {...this.state.image};
    const formattedDate = utils.toFormattedDate(date);
    let imageData = fetch(`${this.apodBaseUrl}?api_key=${this.key}&date=${formattedDate}`)
      .then(res => res.json())
      .then(res => {
        const { url, hdurl, title, copyright, explanation, date, media_type } = res;
        Object.assign(image, { url, hdurl, title, copyright, explanation, date, media_type });
        return image;
      })
      .catch(err => console.error(err));
      
    return imageData;
  }

  componentDidMount() {
    this.fetchImageData(this.state.selectedDate)
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDate !== prevState.selectedDate)
      this.fetchImageData(this.state.selectedDate)
        .then(data => {
          this.setState({ data });
        });
  }

  dateCallback = selectedDate => {
    if (utils.isValidAposDate(selectedDate)) {
      this.setState({
        selectedDate,
      });
    }
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
          <ApodMedia
            media_type={this.state.data.media_type}
            title={this.state.data.title}
            url={this.state.data.url}
          />
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
