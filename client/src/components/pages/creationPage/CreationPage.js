import axios from 'axios'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Container, Col, Row } from 'reactstrap'
import SeedSelectorPage from './SeedSelector/SeedSelectorPage'
import AttributeSelector from './AttributeSelector'
import DurationSelector from './DurationSelector'


import { buildUrl } from '../../../util/queryBuilder'
import { attributes } from '../../../assets/attributes'
import Button from './GrowButton'
import SeedDisplay from './SeedDisplay'


class CreationPage extends Component {

    constructor() {
        super()
        const sliders = {}
        attributes.forEach(attribute => sliders[attribute.name] = 50)
        this.state = {
            seeds: [],
            sliders: [],
            limit: 100,
            grownPlaylist: null,
            seedSelection: false
        }
    }

    handleSliderUpdate = e => {
        let name = e.target.name
        let value = e.target.value
        this.setState(prevState => {
            const sliders = prevState.sliders
            const newSlider = { name: name, value: value }
            sliders.push(newSlider)
            return {
                ...prevState,
                sliders: sliders
            }
        })
    }

    parseParamsFromState = () => {
        const seed_artists = []
        const seed_tracks = []
        this.state.seeds.forEach(
            seed => {
                switch (seed.type) {
                    case 'artist':
                        seed_artists.push(seed.id)
                        break
                    case 'track':
                        seed_tracks.push(seed.id)
                        break
                    default:
                        return
                }
            }
        )
        let params = {
            limit: this.state.limit,
            seed_artists,
            seed_tracks
        }
        this.state.sliders.forEach(
            attribute => {
                params[`target_${attribute.name.toLowerCase()}`] = attribute.value
            }
        )
        return params
    }

    getPlaylist = () => {
        const headers = { headers: { 'Authorization': 'Bearer ' + this.props.token } }
        fetch(buildUrl('https://api.spotify.com/v1/recommendations', this.parseParamsFromState()), headers)
            .then(response => response.json())
            .then(res => {
                res.tracks &&
                    this.setState({ grownPlaylist: res })
            })
    }

    getSeedFeatures = seeds => {
        const headers = { headers: { 'Authorization': 'Bearer ' + this.props.token } }
        fetch(buildUrl('https://api.spotify.com/v1/audio-features/', { ids: seeds.map(seed => seed.id) }), headers)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                console.log(this.state.sliders)
            })
        this.setState({ seeds })
    }

    saveClickToDB = () => {
        const data = {
            "name": "ButtonPress",
            "info": [{
                "attribute": "test",
                "value": 50
            }]
        }
        axios.post('/api/data', data).then(res => console.log(res))
    }

    removeSeed = removeSeed => {
        const newSeeds = this.state.seeds.filter(seed => seed !== removeSeed);
        this.setState(prevState => ({
            ...prevState,
            seeds: newSeeds
        }));
    };

    render() {
        return (
            <Container>
                {
                    this.state.seedSelection ?
                        <SeedSelectorPage seeds={this.state.seeds}
                            updateSeeds={seeds => {
                                this.setState({ seeds })
                            }} close={() => this.setState({ seedSelection: false })}
                        />
                        :
                        <>
                            <Button onClick={() => this.setState({ seedSelection: true })}>Pick some seeds</Button>
                            <SeedDisplay seeds={this.state.seeds} removeSeed={seed => this.removeSeed(seed)} />
                            <hr />
                            <Row>
                                <Col xs="12">
                                    <AttributeSelector attributes={attributes} handleSliderUpdate={this.handleSliderUpdate} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <hr />
                                    {
                                        this.state.grownPlaylist &&
                                        <Link to={{ pathname: `/playlist/new}`, playlist: this.state.grownPlaylist }}>Edit</Link>
                                    }
                                    <DurationSelector />
                                    <hr />
                                    <div style={{ padding: "20px" }}>
                                        <Button color="success" onClick={
                                            () => {
                                                this.getPlaylist()
                                            }}>GROW YOUR PLAYLIST
                                            </Button>
                                    </div>
                                </Col>
                            </Row>
                        </>
                }
            </Container>
        );
    }
}

CreationPage.propTypes = {
    token: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return { token: state.token.token }
}

export default connect(mapStateToProps)(CreationPage);