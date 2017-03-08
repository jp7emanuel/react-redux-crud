import React, { Component } from 'react';
import CervejariasIndex from './cervejarias/index';
import CervejariasCreate from './cervejarias/create';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <section className="hero">
            <div className="hero-head">
                <div className="container">
                    <nav className="nav">
                        <div className="nav-left">
                            <Link to="/" className="nav-item is-brand" >
                                <h1 className="title">React+Redux+Bulma</h1>
                            </Link>
                        </div>

                        <div className="nav-right nav-menu">
                            <span className="nav-item">
                                <div className="level-right">
                                    <Link to="/cervejarias/create" className="button is-primary">
                                        Adicionar Cervejaria
                                    </Link>
                                </div>
                            </span>
                        </div>
                    </nav>
                </div>
            </div>
        </section>

        {this.props.children}
      </div>
    );
  }
}
