import axios from 'axios'

import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Container, Button } from 'reactstrap'
import AttributeSelector from './SliderAttributeContainer'
import SeedSelector from './SeedSelector'
import DurationPicker from './DurationPicker'

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
    setTimeout(() => console.log(this.state), 500)

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
        <SeedSelector />
        <hr />
        <AttributeSelector attributes={attributes} handleSliderUpdate={this.handleSliderUpdate} />
        <hr />
        <DurationPicker updateDuration={this.handleDurationUpdate} />
        <hr />
        <Button color="success" onClick={this.saveClickToDB}>Grow playlist</Button >
      </Container>
    );
  }
}

CreationPage.propTypes = {
  token: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(CreationPage);