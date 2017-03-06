import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createCervejaria } from '../../actions/index';
import CervejariasForm, { validate } from './form';
import {withRouter} from 'react-router';

class CervejariasCreate extends Component {
  onSubmit(props) {
    this.props.createCervejaria(props);
    this.props.router.push('/');
  }

  render() {
    return (
      <CervejariasForm
        formSubmit={this.onSubmit.bind(this)}
        actionName="Adicionar"
      />
    );
  }
}

const form = reduxForm({
  form: 'CervejariasCreateForm',
  validate
});

export default connect(null, { createCervejaria })(form(withRouter(CervejariasCreate)));
