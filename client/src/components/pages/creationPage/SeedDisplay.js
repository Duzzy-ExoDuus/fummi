import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Container, Button, Progress} from 'reactstrap'


class SeedDisplay extends Component {
    render() {
        const {seeds, removeSeed} = this.props
        return (
            <Container>
                <div style={{display: 'flex'}}>
                    {
                        seeds.map(
                            seed =>
                                <div key={seed.id} style={{margin: '10px'}}>
                                    {seed.name}
                                    <Button color='danger' onClick={() => removeSeed(seed)}>-</Button>
                                </div>
                        )
                    }
                </div>
                {
                    seeds.length > 0
                        ?
                        <Progress value={20 * seeds.length}/>
                        :
                        "You haven't picked any seeds yet"
                }
            </Container>
        );
    }
}

SeedDisplay.propTypes = {
    seeds: PropTypes.array.isRequired,
    removeSeed: PropTypes.func.isRequired
}

export default SeedDisplay;