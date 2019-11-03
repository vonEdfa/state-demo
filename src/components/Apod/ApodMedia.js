import React from 'react';
import PropTypes from 'prop-types';
import ApodImage from './ApodImage';

const ApodMedia = ({ media_type, title, url }) => {
  switch(media_type) {
  case '':
    // fallthrough
  case 'image':
    return (
      <ApodImage
        url={url}
        title={title}
      />
    );
  case 'video':
    return (
      <div style={{display: 'block'}}>
        <p>Support for videos coming soon! :3</p><br />
        <a href={url}>Meanwhile, visit the video here!</a>
      </div>
    );
  default:
    return <p>Unsupported media type: {media_type}</p>;
  }
};

ApodMedia.defaultProps = {
  media_type: 'image',
  title: '',
};

ApodMedia.propTypes = {
  media_type: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default ApodMedia;