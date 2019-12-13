import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getUser } from '../../../actions/userActions'
import Playlist from '../../general/Playlist'

import { buildUrl, buildHeader } from '../../../util/queryBuilder'

import styled from "styled-components";

const SaveButton = styled.button`
   margin-top: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(90,90,90,0.98); 
  border: none;
  color: white;
  //padding: 30px; 
  cursor: pointer;
  border-radius: 65px;
  text-align:center;
  font-family:"Roboto";
  font-size: 18px;
  font-weight: normal;
  line-height: 22px;
  padding: 1%;
  width:80%;  
`;

const CreateLink = styled(Link)`
  margin-top: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(90,90,90,0.98); 
  border: none;
  color: white;
  //padding: 30px; 
  cursor: pointer;
  border-radius: 65px;
  text-align:center;
  font-family:"Roboto";
  font-size: 18px;
  font-weight: normal;
  line-height: 22px;
  padding: 1%;
  width:80%;  
`;

const PlaylistNameInput = styled.input`
  width: 60vw;
  display: block;
  margin: auto;
  border-radius: 10px;
`

const ConfirmSaveButton = styled.button`
  margin-top: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: #1DB954; 
  border: none;
  color: white;
  //padding: 30px; 
  cursor: pointer;
  border-radius: 65px;
  text-align:center;
  font-family:"Roboto";
  font-size: 18px;
  font-weight: normal;
  line-height: 22px;
  padding: 1%;
  width:20vw;  
`

class EditPage extends Component {

  state = {
    playlistName: "Seedbox Playlist",
    tryToSave:false,
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
        <SaveButton onClick={() => this.setState({tryToSave: !this.state.tryToSave})}>Save playlist to spotify</SaveButton>
        {this.state.tryToSave
            ?
            <>
              <br/>
              <PlaylistNameInput type="text"
                     onChange={
                e => this.setState({playListName:e.target.value})
              }
                     placeholder="SeedBox Playlist"
              />
              <ConfirmSaveButton onClick={()=> this.savePlayListToSpotify()}>Save</ConfirmSaveButton>
            </>
            :
            <></>
        }
        <br/>
        <CreateLink to="/create">Create another playlist</CreateLink>
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