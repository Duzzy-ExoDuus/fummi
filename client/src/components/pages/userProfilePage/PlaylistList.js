import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import playListLogo from '../../../images/playListLogo.png'


const StyledListGroupItem = styled(ListGroupItem)`
    margin-top:10px;
    
`

const LogoImage = styled.img`
  display: block;
	margin-left: auto;
	margin-right: auto;
  width: 35%;

  @media screen and (max-width: 400px) {
    width:50%
}
  @media screen  and (min-width: 400px) and (max-width: 800px)  {
    width:50%

}
`

const H1 = styled.h1`
@media screen and (max-width: 800px) {
  margin-top: 20px;
}
`

const StyledListGroup = styled(ListGroup)`

`
class PlaylistList extends Component {

  render() {
    const { items, loading } = this.props.playlists
    let playlistsToRender = items ?
      items.map(item =>
        <StyledListGroupItem key={item.name}>
         
         <Row>
         <Col></Col>
         <Col>

          <ListGroupItemHeading>
            {item.name}
          </ListGroupItemHeading>
          </Col>
          <Col></Col>
          <Col></Col>

          </Row>
          <Row>
            <Col> <LogoImage id="logo" src={playListLogo} alt="fireSpot" />
</Col>
          <Col>
          <Link to={{pathname:`/playlist/${item.name}`, playlist:item}}>Edit</Link>
          </Col>
          <Col></Col>
          <Col></Col>

          </Row>
          <Row>
          <Col></Col>
            <Col>
              Owner: {item.owner.display_name}
            </Col>
            <Col>
              {item.public ? 'Public' : 'Private'}
            </Col>
            <Col>
              Songs: {item.tracks.total}
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
              <H1>Your playlists</H1>
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