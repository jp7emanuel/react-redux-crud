import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CervejariasIndex from './components/cervejarias_index';
import CervejariasCreate from './components/cervejarias_create';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CervejariasIndex} />
    <Route path="cervejarias/create" component={CervejariasCreate} />
  </Route>
);
