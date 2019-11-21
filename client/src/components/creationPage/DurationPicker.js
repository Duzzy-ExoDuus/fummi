import React, { Component } from 'react';

import { Container, Input, FormGroup, Badge, Button, UncontrolledCollapse } from 'reactstrap'


class DurationPicker extends Component {

  state = { duration: "00:20" }

  render() {
    return (
      <Container>
        <Button color='warning' id={`toggler`}>
          Pick your playlist duration
          <Badge color='error'>hh:mm</Badge>
        </Button>
        <UncontrolledCollapse toggler={`toggler`}>
          <FormGroup>
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
            <Button
              onClick={
                () => {
                  this.props.updateDuration(this.state.duration)
                }
              }>Confirm duration</Button>
          </FormGroup>
        </UncontrolledCollapse>
      </Container>
    );
  }
}

export default DurationPicker;