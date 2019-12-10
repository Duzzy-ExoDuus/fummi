import React, { Component } from 'react';
import SeedSelector from './SeedSelector';

class SeedSelectorPage extends Component {
  render() { 
    return (
      <div>
        <SeedSelector updateSeeds={this.props.updateSeeds} close={this.props.close}/>
        <button onClick={this.props.close}>Confirm seeds</button>
      </div>
    );
  }
}
 
export default SeedSelectorPage;