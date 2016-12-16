import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CervejariasIndex from './components/cervejarias_index';

export default (
  <Route path="/">
    <IndexRoute component={CervejariasIndex} />
  </Route>
);
