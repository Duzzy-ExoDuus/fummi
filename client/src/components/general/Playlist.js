import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap'

class Playlist extends Component {

  render() {
    const { playlist } = this.props
    console.log(playlist)
    return (
      <Container>

      </Container>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired
}

export default Playlist;
