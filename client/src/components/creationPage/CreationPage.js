import React, { Component } from 'react';
import AtrributeSelector from './AtrributeSelector';
import SongRecommendations from './SongRecommendations';

class CreationPage extends Component {
  state = {  }
  render() { 
    return (
      <>
        <AtrributeSelector />
        <SongRecommendations />
      </>
    );
  }
}
 
export default CreationPage;