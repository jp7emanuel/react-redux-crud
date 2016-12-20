import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCervejarias } from '../actions/index';

class CervejariasIndex extends Component {

  componentWillMount() {
    this.props.fetchCervejarias();
  }

  renderCervejarias() {
    return this.props.cervejarias.map((cervejaria) => {
      return (
        <tr key={cervejaria._id}>
          <td>{cervejaria.name}</td>
          <td className="is-icon">
            <a href={`/cervejarias/${cervejaria._id}`}>
              <i className="fa fa-pencil-square-o"></i>
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="container column">
          <h3 className="title is-1">Lista de Cervejarias</h3>
          <hr/>
          <table className="table">
            <thead>
              <tr>
                <th><strong>Name</strong></th>
                <th><strong>Links</strong></th>
              </tr>
            </thead>
            <tbody>
              {this.renderCervejarias()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cervejarias: state.cervejarias.all }
}

export default connect(mapStateToProps, { fetchCervejarias })(CervejariasIndex);
