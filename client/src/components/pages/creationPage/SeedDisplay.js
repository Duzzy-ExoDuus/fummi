import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Container, Button, Progress} from 'reactstrap'
import seedIm from "../../../images/zaadje.png";


class SeedDisplay extends Component {
    render() {
        const {seeds, removeSeed} = this.props
        return (
            <Container>
                <div style={{display: 'block', width:"100%"}}>
                    {
                        seeds.map(
                            seed =>
                                <div key={seed.id} style={{margin: '10px'}}>
                                    <Button color='danger' onClick={() => removeSeed(seed)}>-</Button>
                                    {seed.name}
                                    <svg width="46" height="51" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.4149 2.34413C24.1621 7.74759 29.8025 11.7472 20.1061 29.8342C22.0886 26.1369 24.8077 12.2127 24.4074 13.7453C25.8159 8.35142 25.8768 1.24334 23.5161 1.70852C-9.41199 8.19609 -7.52565 58.1346 27.698 50.1343C54.0999 44.1425 44.1687 -0.000470257 44.1687 -0.000470257C44.1687 -0.000470257 25.9814 -0.10018 25.4149 2.34413Z"
                                              fill="url(#img1)"/>
                                        <defs>
                                            <pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
                                                <image href="todo" x="0" y="0" width="100" height="100" />
                                            </pattern>
                                        </defs>
                                    </svg>




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