import React, { Component } from 'react';
import { Container, Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap'
import Track from '../../../general/Track';

class SearchResultDisplay extends Component {

  render() {
    const { searchResult, addSeed } = this.props
    return (
      <Container>
        <div style={{ display:'flex', overflow: 'hidden', margin: 'none', padding: 'none', maxHeight: '400px' }}>
          <Row>
            <Col sm="6">
            <ListGroup>
              <ListGroupItem>
              <h3>Tracks</h3> <hr />
              {
                searchResult && searchResult.tracks &&
                <div style={{ overflowY: 'scroll', margin: '5px' }}>
                  {
                    searchResult.tracks.items.map(
                      track =>
                        <div key={track.id}>
                          <Track track={track} />
                          <Button color='success' onClick={() => addSeed(track)}>+</Button>
                        </div>
                    )
                  }
                </div>
              }
              </ListGroupItem>
            </ListGroup>
            </Col>
            <Col sm="6">
            <ListGroup>
              <ListGroupItem>
              <h3>Artist</h3> <hr />
              {
                searchResult && searchResult.artists &&
                <div style={{ overflowY: 'scroll', margin: '5px' }}>
                  {
                    searchResult.artists.items.map(
                      artist =>
                        <div key={artist.id}>
                          {artist.name}
                          <Button color='success' onClick={() => addSeed(artist)}>+</Button>
                        </div>)
                  }
                </div>
              }
              </ListGroupItem>
            </ListGroup>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default SearchResultDisplay;