import React from 'react';
import PropTypes from 'prop-types';
import Image from '../ImageLoaders/AspectRatioImageLoader';

const ApodImage = ({ title, url }) => {
  return (
    <Image
      src={url}
      alt={title}
      width="40%"
    />
  );
};

ApodImage.defaultProps = {
  title: '',
};

ApodImage.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default ApodImage;