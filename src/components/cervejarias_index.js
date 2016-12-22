import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCervejarias, deleteCervejaria } from '../actions/index';

class CervejariasIndex extends Component {

  componentWillMount() {
    this.props.requestCervejarias();
  }

  onDelete(id) {
    event.preventDefault();
    this.props.deleteCervejaria(id);
  }

  renderCervejarias() {
    return this.props.cervejarias.map((cervejaria) => {
      return (
        <tr key={cervejaria._id}>
          <td>
            <a href={`/cervejarias/${cervejaria._id}`}>
              {cervejaria.name}
            </a>
          </td>
          <td className="is-icon">
            <a href={`/cervejarias/edit/${cervejaria._id}`}>
              <i className="fa fa-pencil-square-o"></i>
            </a>
            <a href="#" onClick={this.onDelete.bind(this, cervejaria._id)}>
              <i className="fa fa-remove"></i>
            </a>
          </td>
        </tr>
      );
    });
  }
  render() {
    if (this.props.error) {
      return <p className="container column">Houve um problema ao retornar a lista de dados!</p>;
    }

    if (this.props.isLoading) {
      return <p className="container column">Loading...</p>;
    }

    if (!this.props.cervejarias.length) {
      return <p className="container column">Nenhuma cervejaria cadastrada!</p>;
    }

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
  return {
    cervejarias: state.cervejarias.all,
    error: state.cervejarias.error,
    isLoading: state.cervejarias.isLoading
  }
}

export default connect(mapStateToProps, { requestCervejarias, deleteCervejaria })(CervejariasIndex);
