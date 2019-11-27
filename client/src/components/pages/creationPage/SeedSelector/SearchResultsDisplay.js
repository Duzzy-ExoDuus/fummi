import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import Song from '../../../general/Song';

class SearchResultDisplay extends Component {

  render() {
    const { searchResult, addSeed } = this.props
    return (
      <Container>
        <div style={{ borderStyle: 'solid', overflow: 'hidden', margin: 'none', padding: 'none' }}>
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
                            <Song song={track} />
                            <Button color='success' onClick={() => addSeed(track)}>+</Button>
                          </div>
                      )
                    }
                  </div>
                }
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
        </div>
      </Container>
    );
  }
}

export default SearchResultDisplay;