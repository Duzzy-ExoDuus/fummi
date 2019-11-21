import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {Container} from 'reactstrap'

import { connect } from 'react-redux'

class EditPage extends Component {
  state = {}
  render() {
    
    console.log(this.props.location)
    return (
      <Container>
        EditPage
      </Container>
    );
  }
}

EditPage.propTypes = {
  token: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(EditPage);