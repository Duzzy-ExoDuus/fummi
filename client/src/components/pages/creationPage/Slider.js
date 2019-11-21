import React, { Component } from 'react';

import { Badge, Button, UncontrolledCollapse, CustomInput } from 'reactstrap'

class Slider extends Component {
  state = { value: 50 }

  render() {
    return (
      <>
        <Button id={`${this.props.name}-toggler`}>{this.props.name} <Badge color='info'>{this.state.value}</Badge></Button>
        
        <UncontrolledCollapse toggler={`${this.props.name}-toggler`}>
          {this.props.description}
        </UncontrolledCollapse>
        <CustomInput
          id={this.props.name}
          name={this.props.name}
          className='slider' type='range' min={0} max={100}
          onChange={e => this.setState({ value: e.target.value })}
          onMouseUp={e => this.props.handleSliderUpdate(e)}
          onTouchEnd={e => this.props.handleSliderUpdate(e)}
        />
      </>
    );
  }
}

export default Slider;