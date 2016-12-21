import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import CervejariasIndex from './components/cervejarias_index';
import CervejariasCreate from './components/cervejarias_create';
import CervejariasShow from './components/cervejarias_show';
import CervejariasEdit from './components/cervejarias_edit';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CervejariasIndex} />
    <Route path="cervejarias/create" component={CervejariasCreate} />
    <Route path="cervejarias/:id" component={CervejariasShow} />
    <Route path="cervejarias/edit/:id" component={CervejariasEdit} />
  </Route>
);
