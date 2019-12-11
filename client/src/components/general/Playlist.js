import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap'
import Track from './Track';


class Playlist extends Component {

  render() {
    const { tracks, audioFeatures, removeTrack } = this.props
    return (
      <Container>
        {
          tracks.map(function(track, index) {
            return <div key={track.id}>{index+1}<Track track={track} audioFeatures={audioFeatures[index]} /><button onClick={() => removeTrack(track.id)}>-</button><hr /></div>
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
