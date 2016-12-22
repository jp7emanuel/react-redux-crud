import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

export const validate = (values) => {
  const errors = {};
  const rules =  {
    required: 'Campo obrigatório'
  };

  if (!values.name || values.name.trim() === '') {
    errors.name = rules.required;
  }

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="control">
    <label className="label">{label}:</label>
    <p >
      <input
        {...input}
        type={type}
        className={`input ${touched && error ? 'is-danger' : ''}`}
        autoFocus={input.name ===  'name' ? true : false}
      />
      {touched && error && <span className="help is-danger">{error}</span>}
    </p>
  </div>
)

class CervejariasForm extends Component {
  onSubmit(props) {
    this.props.formSubmit(props);
  }

  render() {
    const { handleSubmit, submitting, pristine, reset, initialValues, error, isLoading } = this.props;

    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
        <div className="container column">
          <h3 className="title is-1">{this.props.actionName} Cervejaria</h3>
          <hr/>

          <Field name="name" label="Name" component={renderField} type="text" />

          <p className="control">
            <button type="submit" className="button is-primary" disabled={submitting}>Enviar</button>
            <button type="button" className="button is-link" disabled={pristine || submitting} onClick={reset}>Reiniciar</button>
          </p>

        </div>
      </form>
    );
  }
}

const form = reduxForm({
  form: 'CervejariasStoreForm',
  validate
});


// export default connect(mapStateToProps)(form(CervejariasForm));
export default connect()(form(CervejariasForm));
