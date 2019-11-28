import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import option from '../../../images/option.png'
import note from '../../../images/musicNote.png'
import playListStick from '../../../images/playListStick.png'


const StyledListGroupItem = styled(ListGroupItem)`
border-style: solid;
border-color: black;
border-width: 1px;
font-family:"Arial Rounded MT Bold", Arial, Helvetica, sans-serif;
font-size: 15px;
:hover{
  background-color: #F8F8F8; 
  color: black;
  border-width: 1px;
}
@media screen and (max-width: 500px) {
  font-family:"Comic Sans MS", Comic Sans, cursive;

  margin-top:1px;
  border-style: solid;
  border-color: gray ;
    border-width: 0px 0px 0px 0px; 
  }
`

const LogoImageEdit = styled.img`
display: block;
	margin-left: auto;
	margin-right: auto;
  padding:10px;
  width: 50px;

  @media screen and (max-width: 500px) {
    float:right   
    padding:0px;
    width: 25px;
    margin-top:-20px;
  }
`
const LogoImageNote = styled.img`
display: block;
	margin-left: auto;
	margin-right: auto;
  padding:10px;
  width: 50px;

  @media screen and (max-width: 500px) {
    float:left;   
    padding:0px;
    width: 25px;
    margin-top:-30px;
  }
`
const StyledDiv = styled.div`
@media screen and (max-width: 500px) {
  position:absolute;
  left:0;
  right:0;
  width: 100%;
  color: black;
  }

`
const H1 = styled.h1`
@media screen and (max-width: 500px) {
  margin-left: 18px;
  font-family:"Comic Sans MS", Comic Sans, cursive;
  font-style: normal;
  font-weight: 800	
 font-size: 30px;
  padding-top: 10px;
  margin-left: 50px;
  
  &::after {
    background: url(${playListStick}) no-repeat scroll center center / 100% auto rgba(255, 255, 255, 0);
    content: "";
    display: inline-block;
    height: 100px;
    margin-left: 8px;
    position: relative;
    top: -10px;
    vertical-align: middle;
    width: 120px;
}

`
const StyledTitle = styled.p`
font-size 20px;
font-weight:bold;
`

const StyledListGroup = styled(ListGroup)`
@media screen and (max-width: 500px) {
  margin-top:110px;
  width:100%;
  position:absolute;
  left:0;
  right:0;
}
`

/*<Row>
<Col>
<strong>Owner:</strong> {item.owner.display_name}
</Col>
<Col>
<strong>{item.public ? 'Public' : 'Private'}</strong>
</Col>
<Col>
<strong>Songs:</strong> {item.tracks.total}
</Col>
<Col><LogoImage id="logo" src={option} alt="fireSpot" /></Col>

</Row>
*/
class PlaylistList extends Component {

  render() {
    const { items, loading } = this.props.playlists
    let playlistsToRender = items ?
      items.map(item =>
        <StyledListGroupItem key={item.name}>
         
         <Row>
         <Col> </Col>
          <ListGroupItemHeading>
            <StyledTitle>{item.name}</StyledTitle>
          </ListGroupItemHeading>
          <Col> </Col>

          </Row>
          <Row>
          <Col><LogoImageNote id="logo" src={note} alt="fireSpot" /></Col>
            <Col>
            Songs: {item.tracks.total}
            </Col>
          <Col><LogoImageEdit id="logo" src={option} alt="fireSpot" /></Col>
          </Row>
          
        </StyledListGroupItem>)
      : []


    return (
      <Container fluid>
        {
          loading ?
            <></> 
            :
            <>
            <StyledDiv>
              <H1>Playlists</H1>
            </StyledDiv>
              <StyledListGroup>
                {playlistsToRender}
              </StyledListGroup>
            </>
        }
      </Container>
    );
  }
}

PlaylistList.propTypes = {
  playlists: PropTypes.object.isRequired
}

export default PlaylistList;