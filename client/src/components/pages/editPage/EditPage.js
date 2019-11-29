import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container, Button } from 'reactstrap'

import { connect } from 'react-redux'
import Playlist from '../../general/Playlist'

import { buildUrl, buildHeader } from '../../../util/queryBuilder'

class EditPage extends Component {

  state = {
    playlist: {},
    tracks: [],
    audioFeatures: []
  }

  componentDidMount() {
    this.initializeState()
  }

  initializeState = () => {
    const { location, token } = this.props

    const params = []
    location.playlist.tracks.forEach(track => params.push(track.id))
    fetch(buildUrl('https://api.spotify.com/v1/audio-features', { ids: params }), buildHeader(token))
      .then(response => response.json())
      .then(res => this.setState({
        playlist: location.playlist,
        tracks: location.playlist.tracks,
        audioFeatures: res.audio_features
      }))
  }

  render() {
    return (
      <Container>
        <Button color='success'>Save playlist to spotify</Button>
        <Playlist tracks={this.state.tracks} audioFeatures={this.state.audioFeatures} />
        <button onClick={() => console.log(this.state)}>debugton</button>
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