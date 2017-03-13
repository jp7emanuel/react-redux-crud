import React from 'react';
import { Provider } from 'react-redux';
import appRoutes from '../src/routes';
import ReactDOMServer from 'react-dom/server'
import axios from 'axios';
import { match, RouterContext } from 'react-router';
import configureStore from '../src/utils/config-store';
import path from 'path';
import fs from 'fs';

export default (req, res) => {
  match({ routes: appRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      if (req.url === '/') { // index route
        return axios.get('http://localhost:8080/api/stores')
          .then(response => {
            const initialState = {
              stores: {
                all: response.data,
                store: null,
                fetching: false,
                fetched: false,
                error: null
              }
            };

            return getRenderedPage(res, renderProps, initialState);
          });
      }

      const splitUrl = req.url.split('/');
      const id = splitUrl[(splitUrl.length-1)];

      if (id !== 'create') {
        return axios.get('http://localhost:8080/api/stores/' + id)
          .then(response => {
            const initialState = {
              stores: {
                all: [],
                cervejaria: response.data,
                isLoading: false,
                error: false
              }
            };

            return getRenderedPage(res, renderProps, initialState);
          });
      }

      return getRenderedPage(res, renderProps);

    } else {
      res.status(404).send('Not found')
    }
  });
}

function getRenderedPage(res, renderProps, state = {}) {
  const store = configureStore(state);
  const html = getHtml(store, renderProps);

  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  return fs.readFile(filePath, 'utf8', (err, htmlData) => {
    const RenderedApp = htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    return res.status(200).send(RenderedApp);
  });
}

function getHtml(store, renderProps) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
}
