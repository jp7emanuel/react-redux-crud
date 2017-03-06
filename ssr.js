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
            const initialState = {
              cervejarias: {
                all: response.data,
                cervejaria: null,
                isLoading: false,
                error: false
              }
            };

            return getRenderedPage(res, renderProps, initialState);
          });
      }

      const splitUrl = req.url.split('/');
      const id = splitUrl[(splitUrl.length-1)];

      if (id !== 'create') {
        return axios.get('http://localhost:8081/api/cervejarias/' + id)
          .then(response => {
            const initialState = {
              cervejarias: {
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
  const preloadedState = store.getState();
  const pageRendered = renderFullPage(html, preloadedState);

  return res.status(200).send(pageRendered);
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
        <div id="app">${html}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
        <script src="http://localhost:8080/bundle.js"></script>
    </body>
    </html>

    `;
}
