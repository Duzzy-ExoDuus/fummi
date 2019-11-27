import React, { Component } from 'react';

import { Container } from 'reactstrap'
import SearchBar from './SeedSearchBar';
import SeedDisplay from './SeedDisplay';

class SeedSelector extends Component {

  state = {
    seeds: []
  }
  
  addSeed = addSeed => {
    if (this.state.seeds.length < 5 && !this.state.seeds.find(seed => seed.id === addSeed.id )) {
        const newSeeds = this.state.seeds
        newSeeds.push(addSeed)
        this.setState(prevState => ({
          ...prevState,
          seeds: newSeeds
        }))
        this.props.updateSeeds(newSeeds)
    }
  }

  removeSeed = removeSeed => {
    const newSeeds = this.state.seeds.filter(seed => seed !== removeSeed)
    this.setState(prevState => ({
      ...prevState,
      seeds: newSeeds
    }))
    this.props.updateSeeds(newSeeds)
  }

  render() {
    return (
      <Container>
        <SeedDisplay seeds={this.state.seeds} removeSeed={this.removeSeed} />
        <SearchBar addSeed={this.addSeed} />
      </Container>
    );
  }
}

export default SeedSelector;