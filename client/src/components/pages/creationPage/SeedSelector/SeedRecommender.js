import React, { Component } from 'react';

import { connect } from 'react-redux'
// import { buildUrl } from '../../../../util'

class SeedRecommender extends Component {
  state = {}
  render() {
    return (
      <>

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(SeedRecommender);