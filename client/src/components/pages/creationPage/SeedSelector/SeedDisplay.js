import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container, Button } from 'reactstrap'


class SeedDisplay extends Component {
  render() {
    const {seeds, removeSeed} = this.props
    return (
      <Container>
        <div style={{ borderStyle: 'solid', backgroundColor: 'green', overflow: 'hidden', margin: 'none', padding: 'none', minHeight:'80px' }}>
        {
          seeds.map(
            seed =>
              <div key={seed.id}>
                {seed.name}
                <Button color='danger' onClick={() => removeSeed(seed)}>-</Button>
              </div>
          )
        }
        </div>
      </Container>
    );
  }
}

SeedDisplay.propTypes = {
  seeds: PropTypes.array.isRequired,
  removeSeed: PropTypes.func.isRequired
}

export default SeedDisplay;