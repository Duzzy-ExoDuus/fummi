import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container } from 'reactstrap'

import { connect } from 'react-redux'
import Playlist from '../../general/Playlist';

/* TOOD
Display a playlist
Delete option
Save option
Display information button
*/



class EditPage extends Component {

  state = { playlist: {} }

  componentDidMount() {
    this.getTracks()
  }

  getTracks = () => {
    const { location, token } = this.props
    let headers = { headers: { 'Authorization': 'Bearer ' + token } }
    
    fetch(location.playlist.href, headers)
      .then(tracks => tracks.json())
      .then(playlist => this.setState({ playlist }))
  }

  render() {
    return (
      <Container>
        <Playlist playlist={this.state.playlist} />
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