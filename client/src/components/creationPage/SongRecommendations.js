import React, { Component } from 'react';
import Song from '../general/Song';

class SongRecommendations extends Component {
  state = {  }
  render() { 
    return (
      <div style={{backgroundColor: 'red', width:'auto'}}>
        <Song></Song>
        <Song></Song>
        <Song></Song>
        <Song></Song>
        SongRecommendations
      </div>
    );
  }
}
 
export default SongRecommendations;