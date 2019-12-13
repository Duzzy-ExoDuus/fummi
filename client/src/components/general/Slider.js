import React, {Component} from 'react';

import {Badge, Button, UncontrolledCollapse} from 'reactstrap'
import styled from 'styled-components'


const SliderInput = styled.input`
-webkit-appearance: none;  /* Override default CSS styles */
appearance: none;
margin-top:10px;
width: 95%;
height: 6px; /* Specified height */
/*background: rgba(53, 53, 53, 1); !* Grey background *!*/
background: linear-gradient(90deg, #14876a 50%, rgba(53, 53, 53, 1) 50%);
outline: none; 
opacity: 1; /* Set transparency to 0.7(for mouse-over effects on hover) */
-webkit-transition: .2s; /* 0.2 seconds transition on hover */
transition: opacity .2s;
border-style: solid;
border-radius: 25px;
border-color: whitesmoke;
border-width: 1px;
&:hover {
  opacity: 1; /* Fully shown on mouse-over */
}
&::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px;
  height: 20px;
  width: 20px;
  border-radius: 30px;
  background: #08977d;
  cursor: pointer;
  //box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
&::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid;
  height: 20px;
  width: 20px;
  border-radius: 30px;
  //background: #191414;
  cursor: pointer;
}

::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid;
  height: 20px;
  width: 20px;
  border-radius: 30px;
  //background: #191414;
  cursor: pointer;
}
`;

const SliderButton = styled.button`
  border-radius: 30px;
  border: 1px solid  ;
  background-color: #c9c9c9;
  box-shadow: transparent;
  font-family: Roboto;
  color:white;
  padding:1%;
  padding-left: 3%;
  padding-right: 3%;
`;

class Slider extends Component {
    state = {value: 50}

    render() {
        const pixelAdjustment = -0.15 * this.state.value + 8;
        const percentageAdjustment = pixelAdjustment / 5.76;
        const pixelValue = parseInt(this.state.value) + percentageAdjustment;
        const sliderStyle = {
            background: 'linear-gradient(90deg, #08977d ' + pixelValue + '%, rgba(192,192,192, 1) ' + pixelValue + '%)'
        };
        const nameStyle = {
            backgroundColor: "",
            padding: '10px'
        };
        return (
            <>
                <div style={nameStyle}>
                    <SliderButton id={`${this.props.name}-toggler`}>{this.props.name}: {this.state.value}</SliderButton>
                </div>
                <UncontrolledCollapse toggler={`${this.props.name}-toggler`}>
                    {this.props.description}
                </UncontrolledCollapse>
                <SliderInput
                    style={sliderStyle}
                    id={this.props.name}
                    name={this.props.name}
                    className='slider' type='range' min={0} max={100}
                    onChange={e => this.setState({value: e.target.value})}
                    onMouseUp={e => this.props.handleSliderUpdate(e)}
                    onTouchEnd={e => this.props.handleSliderUpdate(e)}
                />
            </>
        );
    }
}

export default Slider;