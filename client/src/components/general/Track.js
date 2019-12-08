import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Button, Col, Collapse, Progress, Row} from 'reactstrap'


class Track extends Component {

    state = {
        playingPreview: false,
        featuresDisplayed: false
    };

    render() {
        console.log(this.props);
        const {artists, name, preview_url} = this.props.track;
        let artistList = artists.map(artist => artist.name + ', ');
        artistList[artistList.length - 1] = artistList[artistList.length - 1].substring(0, artistList[artistList.length - 1].length - 2);
        return (
            <>
                <Row>
                    <Col xs="4">
                        {name}
                    </Col>
                    <Col xs="4">
                        {artistList[0]}
                    </Col>
                    <Col xs="4">
                        {
                            preview_url &&
                            <Button onClick={() => this.setState({playingPreview: !this.state.playingPreview})}>
                                Preview
                            </Button>
                        }
                        {
                            this.state.playingPreview &&
                            <iframe title={preview_url} src={preview_url} style={{display: 'none'}}
                                    allow="encrypted-media"/>
                        }
                    </Col>
                    {
                        this.props.audioFeatures &&
                        <Col>
                            <Button
                                onClick={() => this.setState({featuresDisplayed: !this.state.featuresDisplayed})}>Features</Button>
                        </Col>
                    }
                </Row>
                {
                    this.props.audioFeatures &&
                    <Collapse isOpen={this.state.featuresDisplayed}>
                        <div>
                            Acousticness: <Progress color='success'
                                                    value={this.props.audioFeatures.acousticness * 100}/>
                            Danceability: <Progress color='warning'
                                                    value={this.props.audioFeatures.danceability * 100}/>
                            Energy: <Progress color='danger' value={this.props.audioFeatures.energy * 100}/>
                            instrumentalness: <Progress color='info'
                                                        value={this.props.audioFeatures.instrumentalness * 100}/>
                            speechiness: <Progress color='success' value={this.props.audioFeatures.speechiness * 100}/>
                            Tempo: <Progress color='warning' value={this.props.audioFeatures.tempo}/>
                            Valence: <Progress color='danger' value={this.props.audioFeatures.valence * 100}/>
                        </div>
                    </Collapse>
                }
            </>
        );
    }
}

Track.propTypes = {
    track: PropTypes.object.isRequired,
    audioFeatures: PropTypes.object
};


export default Track;