import React from 'react';
import ReactDOM from 'react-dom';
import { act as domAct } from 'react-dom/test-utils';
import { act as testAct, create } from 'react-test-renderer';
import App from './App';

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

describe('App', () => {
  it('renders without errors', () => {
    const errors = [];
    try {
      ReactDOM.render(<App />, container);
    } catch (error) {
      errors.push(error);
    }
    expect(errors).toHaveLength(0);
  });

});
