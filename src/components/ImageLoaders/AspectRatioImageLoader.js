import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import { CircularProgress } from '@material-ui/core';

const initialDimensions = {
  height: 400,
  width: 500,
};

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: {
        ...initialDimensions,
      },
      src: '',
      prevImg: '',
      loader: {
        opacity: 1,
      },
    };
  
    this.defaultStyle = {
      transition: '1s ease-in-out',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    };
  }

  onImgLoad = ({ target: img }) => {
    let { dimensions, loader } = this.state;
    Object.assign(dimensions, {
      height: img.naturalHeight,
      width: img.naturalWidth,
    });
    Object.assign(loader, { opacity: 1 });
    this.setState({ dimensions, loader, prevImg: this.state.src, });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.src !== prevState.src) {
      let { loader } = prevState;
      Object.assign(loader, { opacity: 0.5 });
      return { src: nextProps.src, loader, };
    } else {
      return null;
    }
  }

  render() {
    return (
      <div style={{width: this.props.width}}>
        <div
          style={{
            ...this.defaultStyle,
            width: '100%',
            height: 0,
            paddingTop: `${100 * (this.state.dimensions.height / this.state.dimensions.width)}%`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}
          >
            <Img
              src={this.state.src}
              loader={
                <>
                  <CircularProgress
                    style={{
                      position: 'absolute',
                      zIndex: 1000
                    }}
                  />
                  <img
                    src={this.state.prevImg}
                    alt="Loading..."
                    style={{
                      fontSize: '0.5em',
                      width: '100%',
                      height: 'auto',
                      opacity: this.state.loader.opacity,
                      transition: '1s ease-in-out'
                    }}
                  />
                </>
              }
              style={{
                width: '100%',
                height: 'auto'
              }}
              onLoad={this.onImgLoad}
            />
          </div>
        </div>
      </div>
    );
  }
};

Image.defaultProps = {
  width: 500,
};

Image.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Image;