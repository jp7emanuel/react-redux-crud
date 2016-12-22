import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCervejaria } from '../actions/index';

class CervejariasShow extends Component {
  componentWillMount() {
    this.props.requestCervejaria(this.props.params.id);
  }
  render() {
    const { cervejaria, error, isLoading } = this.props;

    if (error) {
      return <p className="container column">Houve um problema ao retornar a lista de dados!</p>;
    }

    if (isLoading) {
      return <p className="container column">Loading...</p>;
    }

    return (
      <div>
        Cervejaria: { cervejaria.name }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cervejaria: state.cervejarias.cervejaria,
    isLoading: state.cervejarias.isLoading,
    error: state.cervejarias.error
  }
}

export default connect(mapStateToProps, { requestCervejaria })(CervejariasShow);
