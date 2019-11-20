import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Container, Button } from 'reactstrap'
import AttributeSelector from './AtrributeSelector'
import SeedSelector from './SeedSelector'

class CreationPage extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Container>
        <SeedSelector />
        <hr />
        <AttributeSelector />
        <hr />
        <Button color="warning">Pick a playlist duration</Button >
        <hr />
        <Button color="success">Grow playlist</Button >
      </Container>
    );
  }
}

CreationPage.propTypes = {
  token: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(CreationPage);