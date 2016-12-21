import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCervejaria } from '../actions/index';

class CervejariasShow extends Component {
  componentWillMount() {
    this.props.fetchCervejaria(this.props.params.id);
  }
  render() {
    const { cervejaria } = this.props;
    if (!cervejaria) {
      return <div> Loading... </div>;
    }
    return (
      <div>
        Cervejaria: { cervejaria.name }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cervejaria: state.cervejarias.cervejaria }
}

export default connect(mapStateToProps, { fetchCervejaria })(CervejariasShow);
