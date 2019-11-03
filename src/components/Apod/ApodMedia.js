import React from 'react';
import PropTypes from 'prop-types';
import ApodImage from './ApodImage';

const ApodMedia = ({ media_type, title, url }) => {
  return (
    <>
      { media_type === 'image' ? (
        <ApodImage
          url={url}
          title={title}
        />
      ) : (
        media_type
      ) }
    </>
  );
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