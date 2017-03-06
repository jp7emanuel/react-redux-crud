import React from 'react';
import App from './src/components/app';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Routes from './src/routes';
import ReactDOMServer from 'react-dom/server'
import axios from 'axios';
import { match, RouterContext } from 'react-router';

export default function handleRender(req, res) {
  match({ Routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      axios.get('http://localhost:8080/api/stores')
        .then(response => {
          const INITIAL_STATE = {
            all: [],
            cervejaria: null,
            isLoading: true,
            error: false
          };

          const store = createStore(reducers, INITIAL_STATE, applyMiddleware(thunk));

          const context = {};
          const html = ReactDOMServer.renderToString(
            <RouterContext {...renderProps}>
              <Provider store={store}>
                <App />
              </Provider>
            </RouterContext>
          );

          // Grab the initial state from our Redux store
          const finalState = store.getState();

          res.status(200).send(renderFullPage(html, finalState));
        })

    } else {
      res.status(404).send('Not found')
    }
  })
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.ico">
        <title>React App</title>
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyADN_LuQtGtfuQc08O5dvCFgNz_t3LpLKg&language=pt-BR"></script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
        <script type="text/javascript" src="/static/js/main.b7ef3b56.js"></script>
      </body>
    </html>
    `;
}
