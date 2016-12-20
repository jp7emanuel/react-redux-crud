import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createCervejaria } from '../actions/index';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="control">
    <label className="label">{label}</label>
    <p >
      <input {...input} type={type} placeholder={label} className={`input ${touched && error ? 'is-danger' : ''}`}/>
      {touched && error && <span className="help is-danger">{error}</span>}
    </p>
  </div>
)

const validate = (values) => {
  const errors = {};
  const rules =  {
    required: 'Campo obrigatório'
  };

  if (!values.name || values.name.trim() === '') {
    errors.name = rules.required;
  }

  return errors;
}

class CervejariasCreate extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createCervejaria(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="container column">
          <h3 className="title is-1">Adicionar Cervejaria</h3>
          <hr/>

          <Field name="name" component="input" component={renderField} type="text" label="Name"/>

          <p className="control">
            <button type="submit" className="button is-primary" disabled={submitting}>Enviar</button>
            <button type="button" className="button is-link" disabled={pristine || submitting} onClick={reset}>Cancelar</button>
          </p>

        </div>
      </form>
    );
  }
}

const form = reduxForm({
  form: 'CervejariasCreateForm',
  validate
});

export default connect(null, { createCervejaria })(form(CervejariasCreate));
