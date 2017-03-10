import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStore } from '../../actions/store';
import WinterFell from 'winterfell';
import getStoreSchema from './form';
import Loading from '../loadings';
import {requestStoreTypes} from '../../actions/store-type';

class StoreCreate extends Component {
  componentWillMount() {
    this.props.requestStoreTypes();
  }

  onSubmit = (questionAnswers, action) => {
    console.log(questionAnswers, action);
    // this.props.saveStore(questionAnswers);
  }

  onRender = () => {
    return true;
  };

  onUpdate = () => {
    return true;
  }

  render() {
    if (this.props.storeTypes.length < 1) {
      return <Loading />;
    }
    const schema = getStoreSchema(this.props.storeTypes);

    return (
      <section className="section">
        <div className="container">
          <WinterFell schema={schema}
            onSubmit={this.onSubmit}
            panelId="form-stores"
            onRender={this.onRender}
            disableSubmit={true}
            onUpdate={this.onUpdate}
          />
        </div>

      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    storeTypes: state.storeTypes.all
  }
}


export default connect(mapStateToProps, { saveStore, requestStoreTypes })(StoreCreate);
