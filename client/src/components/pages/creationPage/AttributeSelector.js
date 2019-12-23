import React, {Component} from 'react';
import Slider from '../../general/Slider'

import {Container} from 'reactstrap'


class AttributeSelector extends Component {
    state={openedIndex:0};

    handleAttributeClick = (index) => this.setState({openedIndex:(this.state.openedIndex===index ? -1:index)});

    render() {
        const slidersToRender = [];

        for (var i = 0; i < this.props.attributes.length; i++) {
            const {name, description} = this.props.attributes[i];
            slidersToRender.push(<Slider
                key={name}
                name={name}
                index = {i}
                description={description}
                previewTracks={this.props.previewTracks}
                initialValue={this.props.features[i]}
                openedIndex={this.state.openedIndex}
                handleAttributeClick = {this.handleAttributeClick}
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