import React, { Component } from 'react';

import { Container, Input, InputGroupAddon, InputGroup, Badge, Button, UncontrolledCollapse } from 'reactstrap'


class DurationSelector extends Component {

  state = { duration: "00:20" }

  render() {
    return (
      <Container>
        <Button color='warning' id={`toggler`}>
          Pick your playlist duration
          <Badge color='error'>{this.state.duration}-hh:mm</Badge>
        </Button>
        <UncontrolledCollapse toggler={`toggler`}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                id='toggler'
                onClick={() => {
                  this.props.updateDuration(this.state.duration)
                }
                }>Confirm duration</Button>
            </InputGroupAddon>
            <Input
              type="time"
              name="time"
              value={this.state.duration}
              onChange={
                e => {
                  this.setState({ duration: e.target.value })
                }
              }
            />

          </InputGroup>
        </UncontrolledCollapse>
      </Container>
    );
  }
}

export default DurationSelector;