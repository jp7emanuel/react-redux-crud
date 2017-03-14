import React from 'react';
import { Provider } from 'react-redux';
import appRoutes from '../src/routes';
import ReactDOMServer from 'react-dom/server'
import axios from 'axios';
import { matchPath, StaticRouter } from 'react-router-dom';
import App from '../src/components/app';
import routesConfig from '../src/routes/config';

import configureStore from '../src/utils/config-store';
import path from 'path';
import fs from 'fs';

function getHtml(url, store) {
  const context = {};
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
}

function getOutput(url, res, state) {
  const store = configureStore(state);
  const html = getHtml(url, store);
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  return fs.readFileSync(filePath, 'utf8')
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

function sendResponse(url, res, state = {}) {
  const output = getOutput(url, res, state);

  return res.status(200).send(output);
}

export default (req, res) => {
  const renderRoute = routesConfig.some(route => matchPath(req.url, route));
  const url = req.url;
  let output;
  console.log(url);
  if (renderRoute) {
    if (url === '/') {
      console.log('is index');
      return axios.get('http://localhost:8080/api/stores/')
        .then(response => {
          const initialState = {
            stores: {
              all: response.data,
              store: null,
              fetching: false,
              fetched: true,
              error: null
            }
          };

          return sendResponse(url, res, initialState);
        });
    }

    if (url === '/create') {
      return axios.get('http://localhost:8080/api/store-types/')
        .then(response => {
          const initialState = {
            storeTypes: {
              all: response.data
            }
          };

          return sendResponse(url, res, initialState);
        });
    }

    return sendResponse(url, res);
  }
}
