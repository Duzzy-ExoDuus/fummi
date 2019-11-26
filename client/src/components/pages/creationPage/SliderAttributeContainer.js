import React, { Component } from 'react';
import Slider from './Slider'

import { Container } from 'reactstrap'


class AttributeSelector extends Component {
  render() {
    const slidersToRender = this.props.attributes.map(attribute => {
      const { name, description } = attribute
      return (
        <Slider
          key={name}
          name={name}
          description={description}
          handleSliderUpdate={e => this.props.handleSliderUpdate(e)}
        />
      )
    })

    return (
      <Container>
        <h1>Track attributes</h1>
        {
          slidersToRender
        }
      </Container>
    );
  }
}

export default AttributeSelector;