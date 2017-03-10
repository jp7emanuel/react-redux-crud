import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import App from '../components/app';
import StoreIndex from '../components/stores';
import StoreCreate from '../components/stores/create';
// import StoreTypeIndex from '../components/store-types';
import StoreTypeCreate from '../components/store-types/create';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={StoreIndex} />
      <Route path="/create" component={StoreCreate} />
    </Route>
    <Route path="/store-types" component={App}>
      <Route path="/store-types/create" component={StoreTypeCreate} />
    </Route>

  </Router>
);

