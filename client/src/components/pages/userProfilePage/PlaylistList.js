import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import option from '../../../images/option.png'


const StyledListGroupItem = styled(ListGroupItem)`
border-style: solid;
border-color: black;
border-width: 1px;
font-family: 'Montserrat', sans-serif;
font-size: 18px;
:hover{
  background-color: #F8F8F8; 
  color: black;
  border-width: 1px ; 
  border-color: #8B9358 ;

}

@media screen and (max-width: 400px) {
  border-style: normal ;
    border-color: #8B9358 ;
    border-width: 1px 0px 0px 0px; 
  }
@media screen  and (min-width: 400px) and (max-width: 850px)  {
  border-style: normal ;
  border-color: #8B9358 ;
  border-width: 1px 0px 0px 0px; 

}
  
`

const LogoImage = styled.img`
display: block;
	margin-left: auto;
	margin-right: auto;
  padding:10px;
  width: 50px;

  @media screen and (max-width: 400px) {
    display: block;
    margin-left: auto;
    margin-right: auto;    
    padding:0px;
    width: 25px;
  }
  @media screen  and (min-width: 400px) and (max-width: 800px)  {
    display: block;
    margin-left: auto;
    margin-right: auto;
      padding:0px;
    width: 25px;

}
`

const StyledDiv = styled.div`
@media screen and (max-width: 400px) {
  
  width: 100%;
  height: 59px;
  
  background-color: #8B9358;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;

  }
  @media screen  and (min-width: 400px) and (max-width: 800px)  {
  width: 100%;
  height: 59px;
  
  background-color: #8B9358;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;

}
`

const H1 = styled.h1`
@media screen and (max-width: 400px) {
  margin-left: 20px;
}
@media screen  and (min-width: 400px) and (max-width: 800px)  {
  margin-left: 20px;
}
`
const StyledTitle = styled.p`
font-size 23px;
font-weight:bold;
font-family: 'Montserrat', italic;

`

const StyledListGroup = styled(ListGroup)`
@media screen and (max-width: 400px) {
  width:100%;
  position: absolute;
  left: 0;
  rigth:0;
  margin-top:10px;
}
@media screen  and (min-width: 400px) and (max-width: 800px)  {
  width:100%;
  position: absolute;
left: 0;
rigth:0;
margin-top:10px;


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
         <Col> <ListGroupItemHeading>
            <StyledTitle>{item.name}</StyledTitle>
          </ListGroupItemHeading>
          </Col>


          </Row>
          <Row>
          <Col>
          Songs: {item.tracks.total}
            </Col>
            <Col>
            {item.public ? 'Public' : 'Private'}
            </Col>
          
          <Col><LogoImage id="logo" src={option} alt="fireSpot" /></Col>

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
              <H1>Your playlists</H1>
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