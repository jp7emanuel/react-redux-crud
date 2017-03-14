import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../routes';
import routesConfig from '../routes/config';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                  Stores UI
              </Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/create" className="button is-primary">
                      Adicionar Store
                  </Link>
                </li>
                <li>
                  <Link to="/store-types/create" className="button is-primary">
                      Adicionar Store-Type
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {Routes(routesConfig)}
      </div>
    );
  }
}

export default App;
