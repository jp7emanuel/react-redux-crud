import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './utils/config-store';

ReactDOM.render(
  <Provider store={configureStore()}>
      {routes}
  </Provider>
  , document.querySelector('#root'));
