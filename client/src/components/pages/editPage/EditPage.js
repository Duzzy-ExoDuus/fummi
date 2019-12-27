import React, {Component} from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {getUser} from '../../../actions/userActions'
import Playlist from '../../general/Playlist'

import {buildHeader, buildUrl} from '../../../util/queryBuilder'
import styled from "styled-components";


import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Badge from "reactstrap/es/Badge";
import Radio from "@material-ui/core/Radio";

/* The Modal (background) */
const ModalDiv = styled.div`
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

/* Modal Content */
const ModalContent = styled.div`{
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
`;

const HeaderDiv = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;
  margin-top: -50px;
  font-family: Roboto;
  font-size:large;
  padding: 5% 5% 15px;
  margin-bottom:10px;
`;


const SaveButton = styled.button`
  background-color: transparent;
  color: rgb(0, 150, 136);
  font-family:"Roboto";
  border:  none;
  font-weight: bolder;
  float:right;
  margin-right: 10px;
 
`;

const CreateLink = styled(Link)`
  background-color: transparent;
  color: rgb(0, 150, 136);
  font-family:"Roboto";
  font-weight: bolder;
  :focus{
  
  }
`;

const PlaylistNameInput = styled.input`
  width: 60vw;
  display: block;
  margin: auto;
  border-radius: 2px;
`

const ConfirmSaveButton = styled.button`
  margin-top: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(0, 150, 136); 
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

    saveToDB = (string) => {
        const data = {
            "name": this.props.user.user.display_name,
            "info": [{
                "attribute": string,
                "value": 0
            }]
        };
        axios.create({baseURL: 'https://seed-box-backend.herokuapp.com'}).post('/api/data', data).then(res => console.log(res))
    };

    handleChange = event => {
        this.setState({selectedValue:event.target.value});
        this.saveToDB("Understanding of features: " + event.target.value);
    };
    state = {
        playlistName: "SeedBox Playlist",
        tryToSave: false,
        playlist: {},
        tracks: [],
        audioFeatures: [],
        desiredFeatures: [],
        loading: true,
        selectedValue: "3"
    };

    componentDidMount() {
        this.initializeState();
        this.props.getUser(this.props.token);

    }

    initializeState = () => {
        const {location, token} = this.props
        this.setState({desiredFeatures: location.desiredFeatures})
        const params = []
        location.playlist.tracks.forEach(track => params.push(track.id))
        fetch(buildUrl('https://api.spotify.com/v1/audio-features', {ids: params}), buildHeader(token))
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
        const selectedValue  = this.state.selectedValue;
        return (
            <>
                <HeaderDiv>Your Playlist</HeaderDiv>

                <p style={{ fontFamily: "Roboto" }}>
                    How well do you understand the features (acousticness,
                    danceability,...)?
                </p>
                <div style={{ fontFamily: "Roboto" }}>
                    <Radio
                        checked={selectedValue === "1"}
                        onChange={this.handleChange}
                        value="1"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                    />
                    not at all<br/>
                    <Radio
                        checked={selectedValue === "2"}
                        onChange={this.handleChange}
                        value="2"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "B" }}
                    />
                    not really<br/>
                    <Radio
                        checked={selectedValue === "3"}
                        onChange={this.handleChange}
                        value="3"
                        name="radio-button-demo"
                    />
                    sort of<br/>
                    <Radio
                        checked={selectedValue === "4"}
                        onChange={this.handleChange}
                        value="4"
                        name="radio-button-demo"
                    />
                    well<br/>
                    <Radio
                        checked={selectedValue === "5"}
                        onChange={this.handleChange}
                        value="5"
                        name="radio-button-demo"
                    />
                    completely
                </div>

                <SaveButton onClick={() => this.setState({tryToSave: !this.state.tryToSave})}>Save playlist to
                    spotify</SaveButton>

                <br/><br/>
                {this.state.tryToSave
                    ?
                    <>
                        <br/>
                        <PlaylistNameInput type="text"
                                           onChange={
                                               e => this.setState({playlistName: e.target.value})
                                           }
                                           placeholder="SeedBox Playlist"
                        />
                        <ConfirmSaveButton onClick={() => this.savePlayListToSpotify()}>Save</ConfirmSaveButton>
                    </>
                    :
                    <></>
                }
                <br/>

                <p  style = {{fontFamily:"Roboto",fontSize:20}}>Please rate some songs for the experiment</p>
                <Playlist tracks={this.state.tracks} audioFeatures={this.state.audioFeatures}
                              removeTrack={this.removeTrack} desiredFeatures={this.state.desiredFeatures} saveToDB={this.saveToDB}/>

            </>
        );
    }
}

EditPage.propTypes = {
    getUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {token: state.token.token, user: state.user}
}

export default connect(mapStateToProps, {getUser})(EditPage);