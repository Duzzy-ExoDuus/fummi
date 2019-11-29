import React, { Component } from 'react';

import { Container, Col, Row } from 'reactstrap'
import SearchBar from './SeedSearchBar';
import SeedDisplay from './SeedDisplay';

class SeedSelector extends Component {

  state = {
    seeds: []
  }

  addSeed = addSeed => {
    if (this.state.seeds.length < 5 && !this.state.seeds.find(seed => seed.id === addSeed.id)) {
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
        <Row>
          <Col>
            <SearchBar addSeed={this.addSeed} />
          </Col>
          <Col xs='2'>
            <SeedDisplay seeds={this.state.seeds} removeSeed={this.removeSeed} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SeedSelector;