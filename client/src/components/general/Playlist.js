import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap'
import Track from './Track';
import styled from "styled-components"

const DeleteSVG = styled.svg`
  float:right;
  border-radius: 10px;
  width:5vw;
  height:5vw;
  
`

class Playlist extends Component {

  render() {
    const { tracks, audioFeatures, removeTrack } = this.props
    return (
      <Container>
        {
          tracks.map(function(track, index) {
            return <div key={track.id}>
              {index+1}
              <DeleteSVG
                  onClick={() => removeTrack(track.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd" d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z" fill="black"/>
              </DeleteSVG>

              <Track track={track} audioFeatures={audioFeatures[index]} />

              <hr /></div>
          })
        }
      </Container>
    );
  }
}

Playlist.propTypes = {
  tracks: PropTypes.array.isRequired,
  audioFeatures: PropTypes.array
}

export default Playlist;
