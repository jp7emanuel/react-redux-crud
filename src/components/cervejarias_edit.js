import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requestCervejaria, updateCervejaria } from '../actions/index';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="control">
    <label className="label">{label}</label>
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
    const { handleSubmit, submitting, pristine, reset, initialValues, error, isLoading } = this.props;

    if (error) {
      return <p className="container column">Houve um problema ao retornar a lista de dados!</p>;
    }

    if (isLoading) {
      return <p className="container column">Loading...</p>;
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="container column">
          <h3 className="title is-1">Adicionar Cervejaria</h3>
          <hr/>

          <Field name="name" label="Name" component={renderField} type="text" />

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
  form: 'CervejariasEditForm',
  validate
});

function mapStateToProps(state) {
  return {
    initialValues: state.cervejarias.cervejaria,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(mapStateToProps, { requestCervejaria, updateCervejaria })(form(CervejariasEdit));
