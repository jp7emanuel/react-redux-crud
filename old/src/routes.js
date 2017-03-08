import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import App from './components/app';
import CervejariasIndex from './components/cervejarias/index';
import CervejariasCreate from './components/cervejarias/create';
import CervejariasShow from './components/cervejarias/show';
import CervejariasEdit from './components/cervejarias/edit';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CervejariasIndex} />
      <Route path="cervejarias/create" component={CervejariasCreate} />
      <Route path="cervejarias/:id" component={CervejariasShow} />
      <Route path="cervejarias/edit/:id" component={CervejariasEdit} />
    </Route>
  </Router>
);
