import React, { Component } from 'react';
import SeedSelector from './SeedSelector';
import SeedRecommender from './SeedRecommender';

class SeedSelectorPage extends Component {

  render() { 
    return (
      <div>
        <button onClick={this.props.close}>Confirm seeds</button>
        <h2>Get started by picking some seeds</h2>
        <SeedSelector seeds={this.props.seeds} updateSeeds={this.props.updateSeeds} close={this.props.close}/>
        <h2>Or pick some seeds from our recommendations</h2>
        <SeedRecommender />
      </div>
    );
  }
}
 
export default SeedSelectorPage;