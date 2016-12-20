import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCervejarias } from '../actions/index';

class CervejariasIndex extends Component {

  componentWillMount() {
    this.props.fetchCervejarias();
  }

  renderCervejarias() {
    return this.props.cervejarias.map((cervejaria) => {
      return (
         <li key={cervejaria._id}>{cervejaria.name}</li>
      );
    });
  }

  render() {
    return (
      <div className="content">
        <ol>
          {this.renderCervejarias()}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cervejarias: state.cervejarias.all }
}

export default connect(mapStateToProps, { fetchCervejarias })(CervejariasIndex);
