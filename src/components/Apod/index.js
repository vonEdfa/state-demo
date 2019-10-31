import React, { Component } from 'react';
import PropTypes from 'prop-types';

const timeZone = 'America/Los_Angeles';

class Apod extends Component {
  juan = 0;
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
      selectedDate: this.toFormattedDate(this.props.date),
    };
  }

  toFormattedDate(date) {
    if (date instanceof Date) {
      return date.toLocaleDateString('se-sv');
    } else if (typeof date === 'string') {
      const pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
      if (pattern.test(date)) {
        return date;
      }
      try {
        const ddate = new Date(date);
        return this.toFormattedDate(ddate);;
      } catch (err) {
        console.error(err);
      }
    }
  }

  fetchImageData(date) {
    let image = {...this.state.image};
    console.debug('FETCHING', this.toFormattedDate(date));
    const formattedDate = this.toFormattedDate(date);
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
  date: (new Date()).toLocaleDateString('se-sv', {timeZone: timeZone}),
};

Apod.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
  ])
};

export default Apod;