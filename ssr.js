import React from 'react';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import routes from './src/routes';
import ReactDOMServer from 'react-dom/server'
import axios from 'axios';
import { match, RouterContext } from 'react-router';
import configureStore from './src/services/config-store';

export default function handleRender(req, res) {
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      if (req.url === '/') { // index route
        return axios.get('http://localhost:8081/api/cervejarias')
          .then(response => {
            const preloadedState = {
              cervejarias: {
                all: response.data,
                cervejaria: null,
                isLoading: false,
                error: false
              }
            };

            return getRenderedPage(res, renderProps, preloadedState);
          });
      }

      const splitUrl = req.url.split('/');
      const id = splitUrl[(splitUrl.length-1)];

      if (id !== 'create') {
        return axios.get('http://localhost:8081/api/cervejarias/' + id)
          .then(response => {
            const preloadedState = {
              cervejarias: {
                all: [],
                cervejaria: response.data,
                isLoading: false,
                error: false
              }
            };

            return getRenderedPage(res, renderProps, preloadedState);
          });
      }

      const store = configureStore();
      return getRenderedPage(res, renderProps);


    } else {
      res.status(404).send('Not found')
    }
  });
}

function getRenderedPage(res, renderProps, preloadedState = {}) {
  const store = configureStore(preloadedState);
  const html = getHtml(store, renderProps);
  const finalState = store.getState();

  return res.status(200).send(renderFullPage(html, finalState));
}

function getHtml(store, renderProps) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
}

function renderFullPage(html, preloadedState) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="http://localhost:8080/styles/css/app.css">
    </head>
    <body>
        <div id="app"></div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
        <script src="http://localhost:8080/bundle.js"></script>
    </body>
    </html>

    `;
}
