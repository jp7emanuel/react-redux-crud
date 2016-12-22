import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCervejaria } from '../../actions/index';
import ErrorMessage from '../errors/index';
import Loading from '../errors/index';

class CervejariasShow extends Component {
  componentWillMount() {
    this.props.requestCervejaria(this.props.params.id);
  }
  render() {
    const { cervejaria, error, isLoading } = this.props;

    if (error) {
      return <ErrorMessage />;
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="container column">
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
