import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toFormattedDate, todayInCorrectTimeZone } from './utils';

class Apod extends Component {
  apodBaseUrl = 'https://api.nasa.gov/planetary/apod';
  key = process.env.REACT_APP_NASA_API_TOKEN;

  constructor(props) {
    super(props);
    this.state = {
      image: {
        url: '',
        hdurl: '',
        title: '',
        copyright: '',
        explanation: '',
        date: '',
        media_type: '',
      },
      selectedDate: toFormattedDate(this.props.date),
    };
  }

  fetchImageData(date) {
    let image = {...this.state.image};
    console.debug('FETCHING', toFormattedDate(date));
    const formattedDate = toFormattedDate(date);
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
    this.fetchImageData(this.props.date)
      .then((image) => {
        this.setState({ image,
          selectedDate: this.props.date });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDate !== prevState.selectedDate)
      this.fetchImageData(this.state.selectedDate)
        .then(image => {
          this.setState({ image });
        });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.date !== prevState.selectedDate) {
      return { selectedDate: nextProps.date };
    } else {
      return null;
    }
  }

  render() {
    return (
      <>
        <h1>APOD</h1>
        { this.state.image.media_type === 'image' ? (
          <img src={this.state.image.url} alt={this.state.image.title} />
        ) : (
          this.state.image.media_type
        ) }
      </>
    );
  }
}

Apod.defaultProps = {
  date: todayInCorrectTimeZone,
};

Apod.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ])
};

export default Apod;