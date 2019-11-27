import axios from 'axios'

import React, { Component } from 'react';

import { Container, Button } from 'reactstrap'
import SeedSelector from './SeedSelector/SeedSelector'
import AttributeSelector from './AttributeSelector'
import DurationSelector from './DurationSelector'


import { attributes } from '../../../assets/attributes'

const DEFAULT_PLAYLIST_DURATION = "00:20"

class CreationPage extends Component {

  constructor() {
    super()
    const sliders = {}
    attributes.forEach(attribute => sliders[attribute.name] = 50)
    this.state = {
      sliders,
      duration: DEFAULT_PLAYLIST_DURATION,
      seeds: []
    }
  }

  handleSliderUpdate = e => {
    let name = e.target.name
    let value = e.target.value
    this.setState(prevState => {
      const sliders = prevState.sliders
      sliders[name] = value
      return {
        ...prevState,
        sliders: sliders
      }
    })
  }

  handleDurationUpdate = newDuration => {
    this.setState(
      prevState => ({
        ...prevState,
        duration: newDuration
      }))
    setTimeout(() => console.log(this.state), 500)
  }

  saveClickToDB = () => {
    const data = {
      "name": "ButtonPress",
      "info": [{
        "attribute": "test",
        "value": 50
      }]
    }
    axios.post('/api/data', data).then(res => console.log(res))
  }

  render() {
    return (
      <Container>
        <SeedSelector updateSeeds={seeds => this.setState({seeds})} />
        <hr />
        <AttributeSelector attributes={attributes} handleSliderUpdate={this.handleSliderUpdate} />
        <hr />
        <DurationSelector updateDuration={this.handleDurationUpdate} />
        <hr />
        <Button color="success" onClick={() => console.log(this.state)}>Grow playlist</Button >
      </Container>
    );
  }
}

export default CreationPage;