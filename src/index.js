import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';
import configureStore from './services/config-store';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

ReactDOM.render(
  <Provider store={configureStore(preloadedState)}>
    {routes}
  </Provider>
  , document.querySelector('#app'));
