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
    width:70%;
`;

const OptionDiv = styled.div`
    flex: 0 0 100%;
    order:3;
    width:0%;
`;

class Artist extends Component {

    state = {
        playingPreview: false,
        featuresDisplayed: false
    };

    render() {
        return (
            <ListItem>
                <CoverImageDiv>
                    <CoverImage src={this.props.imgUrl} width="10%" height="auto" alt="" />
                </CoverImageDiv>

                <NameDiv><NameHeader>{this.props.name}</NameHeader></NameDiv>
                <InfoDiv></InfoDiv>
                <OptionDiv></OptionDiv>
            </ListItem>
        );
    }
}

Artist.propTypes = {

};


export default Artist;