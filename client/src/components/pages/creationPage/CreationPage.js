import axios from 'axios'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Container, Col, Row} from 'reactstrap'
import SeedSelector from './SeedSelector/SeedSelector'
import AttributeSelector from './AttributeSelector'
import DurationSelector from './DurationSelector'


import {buildUrl} from '../../../util/queryBuilder'
import {attributes} from '../../../assets/attributes'
import Button from './GrowButton'


class CreationPage extends Component {

    constructor() {
        super()
        const sliders = {}
        attributes.forEach(attribute => sliders[attribute.name] = 50)
        this.state = {
            sliders: [],
            seeds: [],
            limit: 100,
            grownPlaylist: null
        }
    }

    handleSliderUpdate = e => {
        let name = e.target.name
        let value = e.target.value
        this.setState(prevState => {
            const sliders = prevState.sliders
            const newSlider = {name: name, value: value}
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
        const headers = {headers: {'Authorization': 'Bearer ' + this.props.token}}
        fetch(buildUrl('https://api.spotify.com/v1/recommendations', this.parseParamsFromState()), headers)
            .then(response => response.json())
            .then(res => this.setState({grownPlaylist: res}))
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

    render() {
        return (
            <Container>
                <Row>
                    <SeedSelector updateSeeds={seeds => this.setState({seeds})}/>
                </Row>
                <hr/>

                <Row>
                    <Col xs="12">
                        <AttributeSelector attributes={attributes} handleSliderUpdate={this.handleSliderUpdate}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <hr/>
                        {
                            this.state.grownPlaylist &&
                            <Link to={{pathname: `/playlist/new}`, playlist: this.state.grownPlaylist}}>Edit</Link>
                        }
                        <DurationSelector/>
                        <hr/>
                        <div style={{padding: "20px"}}>
                            <Button color="success" onClick={
                                () => {
                                    this.getPlaylist()
                                }}>
                                GROW YOUR PLAYLIST
                            </Button>
                        </div>
                    </Col>
                </Row>


            </Container>
        );
    }
}

CreationPage.propTypes = {
    token: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {token: state.token.token}
}

export default connect(mapStateToProps)(CreationPage);