import React, { Component } from 'react';

class Slider extends Component {
  state = { value: 50 }

  render() {
    return (
      <>
        <p className='slider-header'>{this.props.name} {this.state.value} </p>
        <input
          name={this.props.name}
          className='slider' type='range' min={0} max={100}
          onChange={e => this.setState({ value: e.target.value })}
          onMouseUp={e => this.props.handleOnMouseUp(e)}
        />
      </>
    );
  }
}

export default Slider;