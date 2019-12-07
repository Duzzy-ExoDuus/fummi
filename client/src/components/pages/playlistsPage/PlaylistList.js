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
font-family:"Montserrat", sans-serif;
font-size: 15px;
:hover{
  background-color: #F8F8F8; 
  color: black;
  border-width: 1px;
}
@media screen and (max-width: 500px) {
  font-family:"Montserrat", sans-serif;
  font-weight:lighter;
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
  }
`
const StyledDiv = styled.div`
@media screen and (max-width: 500px) {
  // position:absolute;
  // left:0;
  // right:0;
  // width: 100%;
  // color: black;
  }

`
const ThreeDotsDiv = styled.div`
@media screen and (max-width: 500px) {
      display:block;
      float:right;
      // margin-left:auto;
      // margin-right:auto;
      margin-top:-20px;
      cursor:pointer;
  }

`
const H1 = styled.h1`
@media screen and (max-width: 500px) {
  text-align:center;
  font-family:"Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800	
 font-size: 30px;
  padding-top: 10px;
  
//   &::after {
//     background: url(${playListStick}) no-repeat scroll center center / 100% auto rgba(255, 255, 255, 0);
//     content: "";
//     display: inline-block;
//     height: 100px;
//     margin-left: 8px;
//     position: relative;
//     top: -10px;
//     vertical-align: middle;
//     width: 120px;
// }

`
const StyledTitle = styled.p`
font-size 20px;
font-weight:normal;
text-align:center;
`

const StyledListGroup = styled(ListGroup)`
@media screen and (max-width: 500px) {
  margin-top:-100px;
  width:100%;
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
            <Col><LogoImageNote id="logo" src={note} alt="fireSpot" /></Col>
         <Row>
         <Col><ListGroupItemHeading>
             <StyledTitle>{item.name}</StyledTitle>
         </ListGroupItemHeading> </Col>

         </Row>

          <Row>
              <Col></Col>
            <Col>
            Songs: {item.tracks.total}
            </Col>
          <Col>
              <ThreeDotsDiv>
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd" d="M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z" fill="black"/>
              </svg>
             </ThreeDotsDiv>
          </Col>
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
            {/*<StyledDiv>*/}
            {/*  <H1>Playlists</H1>*/}
            {/*</StyledDiv>*/}
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