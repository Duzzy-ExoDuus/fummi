import React, {Component} from 'react';

import {Badge, Button, UncontrolledCollapse} from 'reactstrap'
import styled from 'styled-components'
import SeedTrack from './SeedTrack'
import Track from "./Track";

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
  background-color: #919191;
  box-shadow: transparent;
  font-family: Roboto;
  color:white;
  padding:1%;
  padding-left: 3%;
  padding-right: 3%;
`;

const InfoSVG = styled.svg`
  margin-left: 4px;
  margin-top: -3px;
`

class Slider extends Component {
    state = {value: this.props.initialValue}

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
                    <SliderButton id={`${this.props.name}-toggler`}>
                        {this.props.name}: {this.state.value}

                        <InfoSVG width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16666 14.1667H10.8333V9.16667H9.16666V14.1667ZM9.99999 1.66667C5.39999 1.66667 1.66666 5.40001 1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.40001 14.6 1.66667 9.99999 1.66667ZM9.99999 16.6667C6.32499 16.6667 3.33332 13.675 3.33332 10C3.33332 6.32501 6.32499 3.33334 9.99999 3.33334C13.675 3.33334 16.6667 6.32501 16.6667 10C16.6667 13.675 13.675 16.6667 9.99999 16.6667ZM9.16666 7.50001H10.8333V5.83334H9.16666V7.50001Z"
                                  fill="white"/>
                        </InfoSVG>

                    </SliderButton>
                </div>
                <UncontrolledCollapse toggler={`${this.props.name}-toggler`}>
                    {this.props.description}
                    {this.props.previewTracks.tracks.map(track => <SeedTrack key={track.name} track={track}/>)}
                </UncontrolledCollapse>
                <SliderInput
                    style={sliderStyle}
                    id={this.props.name}
                    name={this.props.name}
                    className='slider' type='range' min={0} max={100} value={this.state.value}
                    onChange={e => this.setState({value: e.target.value})}
                    onMouseUp={e => this.props.handleSliderUpdate(e)}
                    onTouchEnd={e => this.props.handleSliderUpdate(e)}
                />
            </>
        );
    }
}

export default Slider;