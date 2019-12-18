import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Collapse, Progress} from 'reactstrap'
import styled from "styled-components";


import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Badge from "reactstrap/es/Badge";


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function IconContainer(props) {
    const {value, ...other} = props;
    return (
        <Tooltip title={labels[value] || ''}>
            <span {...other} />
        </Tooltip>
    );
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    rating1: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

const ListItem = styled.div`
    width:80vw;
    height:12vw;
    
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
    flex-direction: column;
    margin-left:auto;
    margin-right:auto;
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
    font-weight:normal;
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
    width:60%;
`;

const OptionDiv = styled.div`
    flex: 0 0 100%;
    order:3;
    width:10%;
`;

export const StyledProgressBar = styled(Progress)`
  & > .bar {
    background-color: ${props => props.color || 'green'} !important;
  }
`;


class Track extends Component {

    state = {
        playingPreview: false,
        featuresDisplayed: false,
        rating: null
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
                                this.state.playingPreview
                                    ?
                                    <PreviewSVG fill={preview_url ? "black" : "none"}
                                                onClick={() => this.setState({playingPreview: !this.state.playingPreview})}
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path>
                                    </PreviewSVG>
                                    :
                                    <PreviewSVG fill={preview_url ? "black" : "none"}
                                                onClick={() => this.setState({playingPreview: !this.state.playingPreview})}
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                                    </PreviewSVG>

                            }
                            {
                                this.state.playingPreview &&
                                <iframe title={preview_url} src={preview_url} style={{display: 'none'}}
                                        allow="encrypted-media"/>
                            }
                        </PreviewDiv>
                        <CoverImage src={album.images[0].url} width="10%" height="auto" alt=""/>
                    </CoverImageDiv>

                    <NameDiv><NameHeader>{name}</NameHeader></NameDiv>
                    <InfoDiv>{artistList[0]}</InfoDiv>
                    <OptionDiv>
                        <svg style={{marginTop: "30%", cursor: "pointer"}} width="18" height="36" viewBox="0 0 12 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                             onClick={() => this.setState({featuresDisplayed: !this.state.featuresDisplayed})}>
                            <path opacity="0.54" fillRule="evenodd" clipRule="evenodd"
                                  d="M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z"
                                  fill="black"/>
                        </svg>

                    </OptionDiv>
                </ListItem>
                {
                    this.props.audioFeatures &&
                    <Collapse isOpen={this.state.featuresDisplayed}>
                        <br/>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Rate This Song</Typography>
                            <Rating name={name} value={this.state.rating == null ? "5" : this.state.rating} max={10}
                                    onChange={
                                        e => {
                                            this.setState({rating: e.target.value});
                                            console.log(e.target.value)
                                        }
                                    }/>
                        </Box>
                        <Badge color='success'>Song Features</Badge><br/>
                        <Badge striped color='info'>Requested Features</Badge>
                        <div>

                            Acousticness:
                            <Progress color='success'
                                      value={this.props.audioFeatures.acousticness * 100}/>
                            <Progress striped color="info" value={this.props.desiredFeatures[0]}/>

                            Danceability: <Progress color='success'
                                                    value={this.props.audioFeatures.danceability * 100}/>
                            <Progress striped color="info" value={this.props.desiredFeatures[1]}/>
                            Energy: <Progress color='success' value={this.props.audioFeatures.energy * 100}/>
                            <Progress striped color="info" value={this.props.desiredFeatures[2]}/>
                            Instrumentalness: <Progress color='success'
                                                        value={this.props.audioFeatures.instrumentalness * 100}/>
                            <Progress striped color="info" value={this.props.desiredFeatures[3]}/>
                            Speechiness: <Progress color='success' value={this.props.audioFeatures.speechiness * 100}/>
                            <Progress striped color="info" value={this.props.desiredFeatures[4]}/>
                            Tempo: <Progress color='success' value={(this.props.audioFeatures.tempo - 50) / 1.7}/>
                            <Progress striped color="info" value={this.props.desiredFeatures[5]}/>
                            Valence: <Progress color='success' value={this.props.audioFeatures.valence * 100}/>
                            <Progress striped color="info" value={this.props.desiredFeatures[6]}/>
                        </div>
                    </Collapse>
                }

            </>
        );
    }
}

Track.propTypes = {
    track: PropTypes.object.isRequired,
    audioFeatures: PropTypes.object,
    desiredFeatures: PropTypes.array,
};


export default Track;