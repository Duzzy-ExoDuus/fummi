import React, {Component} from 'react';
import Slider from '../../general/Slider'

import {Container} from 'reactstrap'


class AttributeSelector extends Component {
    render() {
        const slidersToRender = [];

        for (var i = 0; i < this.props.attributes.length; i++) {
            const {name, description} = this.props.attributes[i];
            slidersToRender.push(<Slider
                key={name}
                name={name}
                description={description}
                previewTracks={this.props.previewTracks}
                initialValue={this.props.features[i]}
                initiallyOpen={i === 0}
                handleSliderUpdate={e => this.props.handleSliderUpdate(e)}
            />)
        }

        return (
            <Container>

                {
                    slidersToRender
                }
            </Container>
        );
    }
}

export default AttributeSelector;