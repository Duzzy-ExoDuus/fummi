import React, { Component } from 'react';

import { Badge, Button, UncontrolledCollapse } from 'reactstrap'
import styled from 'styled-components'



const SliderInput = styled.input`
-webkit-appearance: none;  /* Override default CSS styles */
appearance: none;
margin-top:10px;
width: 95%;
height: 15px; /* Specified height */
/*background: rgba(53, 53, 53, 1); !* Grey background *!*/
background: linear-gradient(90deg, #57ab68 50%, rgba(53, 53, 53, 1) 50%);
outline: none; 
opacity: 1; /* Set transparency to 0.7(for mouse-over effects on hover) */
-webkit-transition: .2s; /* 0.2 seconds transition on hover */
transition: opacity .2s;
border-style: solid;
border-radius: 25px;
border-color: whitesmoke;
border-width: 1px;
&::hover {
  opacity: 1; /* Fully shown on mouse-over */
}
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  margin-top: -8px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
&::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
/*
&::-webkit-slider-thumb:hover {
  background: rgba(192,192,192, 1); /* Green background */
}*/
`

class Slider extends Component {
  state = { value: 50 }

  render() {
    const pixelAdjustment = -0.15* this.state.value + 8;
    const percentageAdjustment = pixelAdjustment / 5.76;
    const pixelValue = parseInt(this.state.value) + percentageAdjustment;
    const sliderStyle = {
      background:'linear-gradient(90deg, #1DB854 ' + pixelValue + '%, rgba(192,192,192, 1) ' + pixelValue + '%)'
    };
    const nameStyle = {
      padding:'10px'
    };
    return (
      <>
      <div style={nameStyle} >
        <Button id={`${this.props.name}-toggler`}>{this.props.name} <Badge color='info'>{this.state.value}</Badge></Button>
     </div>
        <UncontrolledCollapse toggler={`${this.props.name}-toggler`}>
          {this.props.description}
        </UncontrolledCollapse>
        <SliderInput
            style={sliderStyle}
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