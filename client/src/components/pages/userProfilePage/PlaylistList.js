import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import {Link} from 'react-router-dom'

class PlaylistList extends Component {

  render() {
    const { items, loading } = this.props.playlists
    let playlistsToRender = items ?
      items.map(item =>
        <ListGroupItem key={item.name}>
          <ListGroupItemHeading>
            {item.name}
          </ListGroupItemHeading>
          <Link to={{pathname:`/playlist/${item.name}`, playlist:item}}>Edit</Link>
          <Row>
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
        </ListGroupItem>)
      : []


    return (
      <Container fluid>
        {
          loading ?
            <></> 
            :
            <>
              <h1>Your playlists</h1>
              <ListGroup>
                {playlistsToRender}
              </ListGroup>
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