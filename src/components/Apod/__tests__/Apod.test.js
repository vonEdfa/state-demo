import React from 'react';
import ReactDOM from 'react-dom';
import { act as domAct } from 'react-dom/test-utils';
import { act as testAct, create } from 'react-test-renderer';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import Apod from '../Apod';
import ApodMedia from '../ApodMedia';
import ApodImage from '../ApodImage';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Apod', () => {

  describe('Apod component', () => {

    it('renders without errors', () => {
      const errors = [];
      try {
        domAct(() => {
          ReactDOM.render(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Apod />
            </MuiPickersUtilsProvider>,
            container
          );
        });
      } catch (error) {
        errors.push(error);
      }
      expect(errors).toStrictEqual([]);
    });

  });

  describe('ApodMedia component', () => {

    it('renders without errors', () => {
      const errors = [];
      try {
        domAct(() => {
          ReactDOM.render(
            <ApodMedia date="2019-10-31" />,
            container
          );
        });
      } catch (error) {
        errors.push(error);
      }
      expect(errors).toStrictEqual([]);
    });

  });

  describe('ApodImage component', () => {

    it('renders without errors', () => {
      const errors = [];
      try {
        domAct(() => {
          ReactDOM.render(
            <ApodImage url="https://apod.nasa.gov/apod/image/1910/ghostlyVeilNebula1034.jpg" />,
            container
          );
        });
      } catch (error) {
        errors.push(error);
      }
      expect(errors).toStrictEqual([]);
    });

    it('snapshot renders', () => {
      let root = null;
      domAct(() => {
        testAct(() => {
          root = create(<ApodImage url="https://apod.nasa.gov/apod/image/1910/ghostlyVeilNebula1034.jpg" />);
        });
      });
      expect(root).toMatchSnapshot();
    });

  });

});
