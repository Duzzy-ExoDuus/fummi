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
import styled from "styled-components";

const GrowPlaylistDiv = styled.div`
    width:80vw;
    height:17vw;
    
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-left:10%;
    margin-right:auto;
    align-items: center;
    justify-content: flex-start;
`;

const HeaderDiv = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;
  margin-top: -50px;
  font-family: Roboto;
  font-size:large;
  padding:5%;
  padding-bottom: 15px;
`

const HeaderDiv2 = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;
  //margin-top: -50px;
  font-family: Roboto;
  font-size:large;
  padding:5%;
  padding-bottom: 15px;
  margin-bottom: 15px;
 
`;

const InfoSVG = styled.svg`
  cursor: pointer;
`
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
            <div style-={{width:"100vw"}}>
                {
                    this.state.seedSelection ?
                        <SeedSelectorPage seeds={this.state.seeds}
                            updateSeeds={seeds => {
                                this.setState({ seeds })
                            }} close={() => this.setState({ seedSelection: false })}
                        />
                        :
                        <>
                            <HeaderDiv>Pick up to 5 seeds</HeaderDiv>
                            <br/><br/>
                            <GrowPlaylistDiv>
                                <Row>
                                    <svg onClick={() => this.setState({ seedSelection: true })}
                                         style={{marginTop: "-22px", cursor: "pointer"}}
                                         width="72" height="80" viewBox="0 0 72 80" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_dd)">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M36 64C51.464 64 64 51.464 64 36C64 20.536 51.464 8 36 8C20.536 8 8 20.536 8 36C8 51.464 20.536 64 36 64Z"
                                                  fill="#009688"/>
                                            <path
                                                d="M63.75 36C63.75 51.3259 51.3259 63.75 36 63.75C20.6741 63.75 8.25 51.3259 8.25 36C8.25 20.6741 20.6741 8.25 36 8.25C51.3259 8.25 63.75 20.6741 63.75 36Z"
                                                stroke="url(#paint0_linear)" strokeWidth="0.5"/>
                                            <path
                                                d="M63.75 36C63.75 51.3259 51.3259 63.75 36 63.75C20.6741 63.75 8.25 51.3259 8.25 36C8.25 20.6741 20.6741 8.25 36 8.25C51.3259 8.25 63.75 20.6741 63.75 36Z"
                                                stroke="url(#paint1_linear)" strokeWidth="0.5"/>
                                        </g>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M43 35H37V29H35V35H29V37H35V43H37V37H43V35Z" fill="white"/>
                                        <defs>
                                            <filter id="filter0_dd" x="0" y="0" width="72" height="80"
                                                    filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                <feColorMatrix in="SourceAlpha" type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                                <feOffset dy="8"/>
                                                <feGaussianBlur stdDeviation="4"/>
                                                <feColorMatrix type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                                <feColorMatrix in="SourceAlpha" type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                                <feOffset/>
                                                <feGaussianBlur stdDeviation="4"/>
                                                <feColorMatrix type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                                                <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow"
                                                         result="shape"/>
                                            </filter>
                                            <linearGradient id="paint0_linear" x1="8.27399" y1="8" x2="8.27399" y2="63.452"
                                                            gradientUnits="userSpaceOnUse">
                                                <stop stopOpacity="0"/>
                                                <stop offset="0.8" stopOpacity="0.02"/>
                                                <stop offset="1" stopOpacity="0.04"/>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear" x1="8" y1="8" x2="8" y2="64"
                                                            gradientUnits="userSpaceOnUse">
                                                <stop stopColor="white" stopOpacity="0.12"/>
                                                <stop offset="0.2" stopColor="white" stopOpacity="0.06"/>
                                                <stop offset="1" stopColor="white" stopOpacity="0"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <p style={{fontFamily:"Roboto",fontWeight:"semibold", fontSize:"120%"}}>Add some seeds</p>
                                    <InfoSVG onclick={() => this.props.history.push("/create")}
                                                 width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.16666 14.1667H10.8333V9.16667H9.16666V14.1667ZM9.99999 1.66667C5.39999 1.66667 1.66666 5.40001 1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.40001 14.6 1.66667 9.99999 1.66667ZM9.99999 16.6667C6.32499 16.6667 3.33332 13.675 3.33332 10C3.33332 6.32501 6.32499 3.33334 9.99999 3.33334C13.675 3.33334 16.6667 6.32501 16.6667 10C16.6667 13.675 13.675 16.6667 9.99999 16.6667ZM9.16666 7.50001H10.8333V5.83334H9.16666V7.50001Z" fill="#979797"/>
                                    </InfoSVG>

                                </Row>
                            </GrowPlaylistDiv>

                            <SeedDisplay seeds={this.state.seeds} removeSeed={seed => this.removeSeed(seed)} />
                            {
                                this.state.seeds.length == 0
                                    ?
                                    <></>
                                    :
                                    <>
                                        <br/>
                                        <HeaderDiv2>Adapt your desired features</HeaderDiv2>
                                        <br/>
                                        <AttributeSelector attributes={attributes} handleSliderUpdate={this.handleSliderUpdate} />

                                        <hr />

                                        <DurationSelector />
                                        <hr />
                                        <div style={{ padding: "20px" }}>
                                            <Button color="success" onClick={
                                                () => {
                                                    this.getPlaylist();

                                                }}>GROW YOUR PLAYLIST
                                            </Button>
                                            {
                                                this.state.grownPlaylist &&
                                                <Link to={{ pathname: `/playlist/new}`, playlist: this.state.grownPlaylist }}>View your playlist</Link>
                                            }
                                        </div>


                                    </>
                            }
                            </>
                }
            </div>
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