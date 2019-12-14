import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Button, Col, Collapse, Progress, Row} from 'reactstrap'
import styled from "styled-components";


const ListItem = styled.div`
    width:80vw;
    height:12vw;
    float:left;
    
    
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 3% auto;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const PreviewDiv = styled.div`
  width:20%;
  float:left;
`;

const PreviewSVG = styled.svg`
  display: inline-block;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  margin-top: 120%;
`

const CoverImage = styled.img`
    width: 80%;
    padding:10%;
    overflow: hidden;
    
`;

const CoverImageDiv = styled.div`
    cursor:pointer;
    flex: 0 0 100%;
    order:0;
    width:30%;
`;

const NameHeader = styled.h1`
    font-size:16px;
    font-weight:medium;
    margin:auto;
    vertical-align:middle;
    //line-height:100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const NameDiv = styled.div`
    flex: 0 0 50%;
    order:2;
    width: 60%;
`;

const InfoDiv = styled.div`
    flex: 0 0 50%;
    font-size:80%;
    order:2;
    width:70%;
`;

const OptionDiv = styled.div`
    flex: 0 0 100%;
    order:3;
    width:0%;
`;

class Track extends Component {

    state = {
        playingPreview: false,
        featuresDisplayed: false
    };

    render() {
        const {artists, name, preview_url, album} = this.props.track;
        let artistList = artists.map(artist => artist.name + ', ');
        artistList[artistList.length - 1] = artistList[artistList.length - 1].substring(0, artistList[artistList.length - 1].length - 2);
        return (
            <>
                <ListItem>
                    <CoverImageDiv>
                        <PreviewDiv>
                        {
                            preview_url &&
                                this.state.playingPreview
                                ?
                                <PreviewSVG onClick={() => this.setState({playingPreview: !this.state.playingPreview})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path>
                                </PreviewSVG>
                                :
                                <PreviewSVG onClick={() => this.setState({playingPreview: !this.state.playingPreview})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                                </PreviewSVG>

                        }
                        {
                            this.state.playingPreview &&
                            <iframe title={preview_url} src={preview_url} style={{display: 'none'}}
                                    allow="encrypted-media"/>
                        }
                        </PreviewDiv>
                        <CoverImage src={album.images[0].url} width="10%" height="auto" alt="" />
                    </CoverImageDiv>

                    <NameDiv><NameHeader>{name}</NameHeader></NameDiv>
                    <InfoDiv>{artistList[0]}</InfoDiv>
                    <OptionDiv>


                    </OptionDiv>
                </ListItem>
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
                                Tempo: <Progress color='warning' value={(this.props.audioFeatures.tempo-50)/1.7}/>
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