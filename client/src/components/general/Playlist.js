import React,{ReactDOM,Component} from 'react';
import PropTypes from 'prop-types';

import {Container} from 'reactstrap'
import Track from './Track';
import styled from "styled-components"

const DeleteSVG = styled.svg`
  float:right;
  border-radius: 10px;
  width:5vw;
  height:5vw;
`
const ModalDiv = styled.div`
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: -1; /* Sit behind */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`{
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
`;

class Playlist extends Component {

    getTrackItems = () =>{
      const {tracks, audioFeatures, removeTrack, desiredFeatures} = this.props;
      return tracks.map(function (track, index) {
        return <div key={track.id}>
          {index + 1}
          <DeleteSVG
              onClick={() => removeTrack(track.id)} width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd"
                  d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z"
                  fill="black"/>
          </DeleteSVG>
          <Track track={track} audioFeatures={audioFeatures[index]} desiredFeatures={desiredFeatures}/>

          <hr/>
        </div>
      });
    };
    
  componentDidMount() {

  }

  render() {
       return <Container>
         {this.getTrackItems()}

        </Container>;
    }
}

Playlist.propTypes = {
    tracks: PropTypes.array.isRequired,
    audioFeatures: PropTypes.array,
    desiredFeatures: PropTypes.array
}

export default Playlist;
