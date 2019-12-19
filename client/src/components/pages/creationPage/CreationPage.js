import axios from 'axios'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Row} from 'reactstrap'
import SeedSelectorPage from './SeedSelector/SeedSelectorPage'
import AttributeSelector from './AttributeSelector'


import {buildUrl} from '../../../util/queryBuilder'
import {attributes} from '../../../assets/attributes'
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
  padding: 5% 5% 15px;
`;

const HeaderDiv2 = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;
  //margin-top: -50px;
  font-family: Roboto;
  font-size:large;
  padding: 5% 5% 15px;
  margin-bottom: 15px;
 
`;

const InfoSVG = styled.svg`
  cursor: pointer;
`;


/* The Modal (background) */
const ModalDiv = styled.div`
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

/* Modal Content */
const ModalContent = styled.div`{
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
`;

/* The Close Button */
const CloseSpan = styled.span`
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    :hover{color: #000;
    text-decoration: none;
    cursor: pointer;}
    :focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    }
`;

const H2 = styled.h2`
  font-family: Roboto;
`;

const H3 = styled.h4`
  font-family: Roboto;
`;
const P = styled.p`
  font-family: Roboto;
`;

const featureNames = ["acousticness", "danceability", "energy", "instrumentalness", "speechiness", "tempo", "valence"]
const featureIndices = {
    "acousticness": 0,
    "danceability": 1,
    "energy": 2,
    "instrumentalness": 3,
    "speechiness": 4,
    "tempo": 5,
    "valence": 6
}

class CreationPage extends Component {

    constructor() {

        super();
        // const features = {};
        // attributes.forEach(attribute => features[attribute.name] = 50);
        this.state = {
            seeds: [],
            limit: 100,
            grownPlaylist: null,
            previewPlaylist: null,
            seedSelection: false,
            infoPopUp: false,
            savePopup: false,
            initialFeatures: null,
            features: [50, 50, 50, 50, 50, 50, 50],
        }
    }


    isTrack = seed => {
        return seed.type === 'track';
    };


    arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    transposeArr = a => {
        return a[0].map(function (_, c) {
            return a.map(function (r) {
                return r[c];
            });
        });
    }

    handleSliderUpdate = e => {
        let name = e.target.name.toLowerCase();
        let value = e.target.value;
        let index = featureIndices[name]
        this.setState(prevState => {
            const features = prevState.features;
            features[index] = value;
            this.getPreview(3);
            return {
                ...prevState,
                features: features
            };
        });


    };

    parseParamsFromState = (limit) => {
        const seed_artists = [];
        const seed_tracks = [];
        this.state.seeds.forEach(
            seed => {
                switch (seed.type) {
                    case 'artist':
                        seed_artists.push(seed.id);
                        break;
                    case 'track':
                        seed_tracks.push(seed.id);
                        break;
                    default:
                        return
                }
            }
        );
        let params = {
            limit: limit,
            seed_artists,
            seed_tracks
        };

        featureNames.forEach(
            featureName => {
                params[`target_${featureName}`] = this.state.features[featureIndices[featureName]]
            }
        );

        return params
    };

    getPlaylist = limit => {
        const headers = {headers: {'Authorization': 'Bearer ' + this.props.token}};
        fetch(buildUrl('https://api.spotify.com/v1/recommendations', this.parseParamsFromState(limit)), headers)
            .then(response => response.json())
            .then(res => {
                res.tracks &&
                this.setState({grownPlaylist: res})
            })
    };

    getPreview = limit => {
        const headers = {headers: {'Authorization': 'Bearer ' + this.props.token}};
        fetch(buildUrl('https://api.spotify.com/v1/recommendations', this.parseParamsFromState(limit)), headers)
            .then(response => response.json())
            .then(res => {
                res.tracks &&
                this.setState({previewPlaylist: res})
            })
    };


    getSeedFeatures = (seeds) => {
        const headers = {headers: {'Authorization': 'Bearer ' + this.props.token}};
        seeds = seeds.filter(s => this.isTrack(s));
        if (seeds.length === 0) return;
        fetch(buildUrl('https://api.spotify.com/v1/audio-features/', {ids: seeds.map(seed => seed.id)}), headers)
            .then(response => response.json())
            .then(resp => {
                const audioFeatures = resp.audio_features;
                const allFeatures = audioFeatures.map(featureVals => {
                    return [featureVals.acousticness * 100, featureVals.danceability * 100, featureVals.energy * 100, featureVals.instrumentalness * 100, featureVals.speechiness * 100, (featureVals.tempo - 50) / 1.7, featureVals.valence * 100]
                });

                const avgFeatures = this.transposeArr(allFeatures).map(featureVals => Math.round(this.arrAvg(featureVals)));
                this.setState({
                    initialFeatures: [...avgFeatures],
                    features: avgFeatures,
                });
            });

    };

    saveClickToDB = () => {
        const data = {
            "name": "ButtonPress",
            "info": [{
                "attribute": "test",
                "value": 50
            }]
        };
        axios.post('/api/data', data).then(res => console.log(res))
    };

    removeSeed = removeSeed => {
        const newSeeds = this.state.seeds.filter(seed => seed !== removeSeed);
        this.setState(prevState => ({
            ...prevState,
            seeds: newSeeds
        }));
    };

    render() {
        return (
            <div style={{width: "100vw"}}>
                {
                    this.state.savePopup
                        ?
                        <ModalDiv>
                            <ModalContent>

                                <H3>How Many Songs would you like your playlist to contain?</H3>
                                <input onChange={e => this.setState({limit: e.target.value})} placeholder="100"
                                       value={this.state.limit}/>
                                <div style={{width: "100%", height: "20px"}}>
                                    <svg style={{float: "right", marginRight: "20px"}}
                                         onClick={() => this.getPlaylist(this.state.limit)} width="20" height="17"
                                         viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.95508 8.2832C8.95508 9.25846 8.78646 10.1152 8.44922 10.8535C8.11198 11.5872 7.62891 12.1523 7 12.5488C6.37565 12.9408 5.6556 13.1367 4.83984 13.1367C4.0332 13.1367 3.31315 12.9408 2.67969 12.5488C2.05078 12.1523 1.56315 11.5895 1.2168 10.8604C0.875 10.1312 0.701823 9.29036 0.697266 8.33789V7.77734C0.697266 6.80664 0.868164 5.94987 1.20996 5.20703C1.55632 4.46419 2.04167 3.89681 2.66602 3.50488C3.29492 3.1084 4.01497 2.91016 4.82617 2.91016C5.63737 2.91016 6.35514 3.10612 6.97949 3.49805C7.6084 3.88542 8.09375 4.44596 8.43555 5.17969C8.77734 5.90885 8.95052 6.75879 8.95508 7.72949V8.2832ZM7.22559 7.76367C7.22559 6.66081 7.01595 5.81543 6.59668 5.22754C6.18197 4.63965 5.5918 4.3457 4.82617 4.3457C4.07878 4.3457 3.49316 4.63965 3.06934 5.22754C2.65007 5.81087 2.43587 6.63802 2.42676 7.70898V8.2832C2.42676 9.37695 2.63867 10.2223 3.0625 10.8193C3.49089 11.4163 4.08333 11.7148 4.83984 11.7148C5.60547 11.7148 6.19336 11.4232 6.60352 10.8398C7.01823 10.2565 7.22559 9.4043 7.22559 8.2832V7.76367ZM14.0352 8.7002L12.9072 9.89648V13H11.1777V3.04688H12.9072V7.71582L13.8643 6.5332L16.7764 3.04688H18.8682L15.1699 7.45605L19.0801 13H17.0293L14.0352 8.7002Z"
                                            fill="#009688"/>
                                    </svg>
                                </div>


                            </ModalContent>
                        </ModalDiv>
                        :
                        <></>
                }
                {
                    this.state.infoPopUp
                        ?
                        <ModalDiv>
                            <ModalContent>

                                <H2>What are seeds?</H2>
                                <P>Seeds are either tracks or artists. You can choose up to 5 seeds which will be used
                                    as a base upon which to grow your playlist.</P>
                                <div style={{width: "100%", height: "20px"}}>
                                    <svg style={{float: "right", marginRight: "20px"}}
                                         onClick={() => this.setState({infoPopUp: false})} width="20" height="17"
                                         viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.95508 8.2832C8.95508 9.25846 8.78646 10.1152 8.44922 10.8535C8.11198 11.5872 7.62891 12.1523 7 12.5488C6.37565 12.9408 5.6556 13.1367 4.83984 13.1367C4.0332 13.1367 3.31315 12.9408 2.67969 12.5488C2.05078 12.1523 1.56315 11.5895 1.2168 10.8604C0.875 10.1312 0.701823 9.29036 0.697266 8.33789V7.77734C0.697266 6.80664 0.868164 5.94987 1.20996 5.20703C1.55632 4.46419 2.04167 3.89681 2.66602 3.50488C3.29492 3.1084 4.01497 2.91016 4.82617 2.91016C5.63737 2.91016 6.35514 3.10612 6.97949 3.49805C7.6084 3.88542 8.09375 4.44596 8.43555 5.17969C8.77734 5.90885 8.95052 6.75879 8.95508 7.72949V8.2832ZM7.22559 7.76367C7.22559 6.66081 7.01595 5.81543 6.59668 5.22754C6.18197 4.63965 5.5918 4.3457 4.82617 4.3457C4.07878 4.3457 3.49316 4.63965 3.06934 5.22754C2.65007 5.81087 2.43587 6.63802 2.42676 7.70898V8.2832C2.42676 9.37695 2.63867 10.2223 3.0625 10.8193C3.49089 11.4163 4.08333 11.7148 4.83984 11.7148C5.60547 11.7148 6.19336 11.4232 6.60352 10.8398C7.01823 10.2565 7.22559 9.4043 7.22559 8.2832V7.76367ZM14.0352 8.7002L12.9072 9.89648V13H11.1777V3.04688H12.9072V7.71582L13.8643 6.5332L16.7764 3.04688H18.8682L15.1699 7.45605L19.0801 13H17.0293L14.0352 8.7002Z"
                                            fill="#009688"/>
                                    </svg>
                                </div>


                            </ModalContent>
                        </ModalDiv>
                        :
                        <></>
                }
                {
                    this.state.seedSelection ?
                        <SeedSelectorPage seeds={this.state.seeds}
                                          updateSeeds={seeds => {
                                              this.setState({seeds});
                                              this.getSeedFeatures(seeds);
                                              this.getPreview(3);
                                          }} close={() => this.setState({seedSelection: false})}
                        />
                        :
                        <>
                            <HeaderDiv>Pick up to 5 seeds</HeaderDiv>
                            <br/><br/>
                            {/*{console.log(this.state.features)}*/}
                            <GrowPlaylistDiv>
                                <Row>
                                    <svg onClick={() => this.setState({seedSelection: true})}
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
                                                <feBlend mode="normal" in2="BackgroundImageFix"
                                                         result="effect1_dropShadow"/>
                                                <feColorMatrix in="SourceAlpha" type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                                <feOffset/>
                                                <feGaussianBlur stdDeviation="4"/>
                                                <feColorMatrix type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                                                <feBlend mode="normal" in2="effect1_dropShadow"
                                                         result="effect2_dropShadow"/>
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow"
                                                         result="shape"/>
                                            </filter>
                                            <linearGradient id="paint0_linear" x1="8.27399" y1="8" x2="8.27399"
                                                            y2="63.452"
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
                                    <p style={{fontFamily: "Roboto", fontWeight: "semibold", fontSize: "120%"}}>Add
                                        some seeds</p>
                                    <InfoSVG onClick={() => this.setState({infoPopUp: true})}
                                             width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.16666 14.1667H10.8333V9.16667H9.16666V14.1667ZM9.99999 1.66667C5.39999 1.66667 1.66666 5.40001 1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.40001 14.6 1.66667 9.99999 1.66667ZM9.99999 16.6667C6.32499 16.6667 3.33332 13.675 3.33332 10C3.33332 6.32501 6.32499 3.33334 9.99999 3.33334C13.675 3.33334 16.6667 6.32501 16.6667 10C16.6667 13.675 13.675 16.6667 9.99999 16.6667ZM9.16666 7.50001H10.8333V5.83334H9.16666V7.50001Z"
                                            fill="#979797"/>
                                    </InfoSVG>

                                </Row>
                            </GrowPlaylistDiv>

                            <SeedDisplay seeds={this.state.seeds} removeSeed={seed => this.removeSeed(seed)}/>
                            {
                                this.state.seeds.length === 0
                                    ?
                                    <></>
                                    :
                                    <>
                                        <br/>
                                        <HeaderDiv2>Adapt your desired features</HeaderDiv2>
                                        <br/>
                                        <AttributeSelector attributes={attributes}
                                                           handleSliderUpdate={this.handleSliderUpdate}
                                                           previewTracks={this.state.previewPlaylist}
                                                           features={this.state.features}/>

                                        {/*<hr/>*/}

                                        {/*<DurationSelector/>*/}
                                        {/*<hr/>*/}
                                        <div style={{padding: "20px"}}>
                                            <Button color="success" onClick={
                                                () => {
                                                    this.setState({savePopup: true})
                                                }}>Grow your playlist
                                            </Button>
                                            {
                                                this.state.grownPlaylist &&
                                                (console.log(this.state.initialFeatures + " " + this.state.features)||true)
                                                &&
                                                this.props.history.push({
                                                    pathname: "/playlist/new",
                                                    playlist: this.state.grownPlaylist,
                                                    desiredFeatures: this.state.features
                                                })
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
};

const mapStateToProps = (state) => {
    return {token: state.token.token}
};

export default connect(mapStateToProps)(CreationPage);