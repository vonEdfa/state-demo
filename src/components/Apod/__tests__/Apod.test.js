import React from 'react';
import ReactDOM from 'react-dom';
import { act as domAct } from 'react-dom/test-utils';
import { act as testAct, create } from 'react-test-renderer';
import Apod from '../Apod';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';

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

});
