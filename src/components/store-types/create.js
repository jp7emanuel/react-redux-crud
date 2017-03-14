import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStoreType } from '../../actions/store-type';
import WinterFell from 'winterfell';
import schema from './form';
import history from 'history';

class StoreTypeCreate extends Component {
  onSubmit = (questionAnswers, action) => {
    this.props.saveStoreType(questionAnswers);
    history.push('/');
  }

  onRender = () => {
    return true;
  };

  onUpdate = () => {
    return true;
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <WinterFell schema={schema}
            onSubmit={this.onSubmit}
            panelId="form-store-types"
            onRender={this.onRender}
            disableSubmit={true}
            onUpdate={this.onUpdate}
          />
        </div>

      </section>
    );
  }
}

export default connect(null, { saveStoreType })(StoreTypeCreate);
