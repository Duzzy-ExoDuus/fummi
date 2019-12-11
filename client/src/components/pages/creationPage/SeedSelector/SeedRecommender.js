import React, { Component } from 'react';

import { connect } from 'react-redux'
// import { buildUrl } from '../../../../util'

class SeedRecommender extends Component {
  state = {}
  render() {
    return (
      <>
      <div>recommended seeds</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(SeedRecommender);