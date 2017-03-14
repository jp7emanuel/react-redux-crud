import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

const Routes = (routesConfig) => (
  <Switch>
    { routesConfig.map(route => (<Route {...route} />)) }
  </Switch>
);

export default Routes;
