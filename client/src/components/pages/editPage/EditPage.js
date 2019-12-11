import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getUser } from '../../../actions/userActions'
import Playlist from '../../general/Playlist'

import { buildUrl, buildHeader } from '../../../util/queryBuilder'

class EditPage extends Component {

  state = {
    playlistName: "Playlist created with SeedBox",
    playlist: {},
    tracks: [],
    audioFeatures: []
  }

  componentDidMount() {
    this.initializeState()
    this.props.getUser(this.props.token)
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

  savePlayListToSpotify = () => {
    const userid = this.props.user.user.id
    const url = `https://api.spotify.com/v1/users/${userid}/playlists`
    const headers = {
      headers: {
        "Authorization": 'Bearer ' + this.props.token,
        "Content-Type": "application/json"
      }
    }
    const params = {
      "name": this.state.playlistName,
      "description": "This playlist was generated with the SeedBox application"
    }

    axios.post(url, params, headers)
    .then(res => {
      const url = `https://api.spotify.com/v1/playlists/${res.data.id}/tracks`
      const params = this.state.tracks.map(track => track.uri)
      axios.post(url, params, headers)
    })
    .then(alert("Your playlist has been saved!"))
  }

  removeTrack = trackId => {
    const updatedTracks = this.state.tracks.filter(track => track.id !== trackId)
    this.setState({
      tracks: updatedTracks
    })
  }

  render() {
    return (
      <>
        <button onClick={() => this.savePlayListToSpotify()}>Save playlist to spotify</button>
        <Link to="/create">Create another playlist</Link>
        <Playlist tracks={this.state.tracks} audioFeatures={this.state.audioFeatures} removeTrack={this.removeTrack} />
      </>
    );
  }
}

EditPage.propTypes = {
  token: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return { token: state.token.token, user: state.user }
}

export default connect(mapStateToProps, { getUser })(EditPage);