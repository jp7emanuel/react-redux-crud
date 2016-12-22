import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requestCervejaria, updateCervejaria } from '../../actions/index';
import CervejariasForm, { validate } from './form';
import Loading from '../loadings/index';
import ErrorMessage from '../errors/index';

class CervejariasEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.requestCervejaria(this.props.params.id);
  }

  onSubmit(props) {
    this.props.updateCervejaria(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { handleSubmit, submitting, pristine, reset, error, isLoading, cervejaria } = this.props;

    if (error) {
      return <ErrorMessage />;
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <CervejariasForm
        formSubmit={this.onSubmit.bind(this)}
        initialValues={cervejaria}
        actionName="Adicionar"
      />
    );
  }
}

const form = reduxForm({
  form: 'CervejariasEditForm',
  validate
});

function mapStateToProps(state) {
  return {
    cervejaria: state.cervejarias.cervejaria,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(mapStateToProps, { requestCervejaria, updateCervejaria })(form(CervejariasEdit));
