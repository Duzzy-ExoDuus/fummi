import React, { Component } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import Track from '../../../general/Track';

class SearchResultDisplay extends Component {

    render() {
        const { searchResult, addSeed } = this.props;
        return (
            <Container>
                <div style={{ display: 'flex', overflow: 'hidden', margin: 'none', padding: 'none' }}>
                    <Row>
                        <Col sm="6">
                            <ListGroup>
                                <ListGroupItem>
                                    <h3>Track</h3>
                                    <hr />
                                    {
                                        searchResult && searchResult.tracks &&
                                        <div style={{ overflowY: 'scroll', margin: '5px' }}>
                                            {
                                                searchResult.tracks.items.map(
                                                    track =>
                                                        <div style={{ padding: "1%" }} key={track.id}>
                                                            <Track track={track} />
                                                            <button onClick={() => addSeed(track)}>+</button>
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
                                    <h3>Artist</h3>
                                    <hr />
                                    {
                                        searchResult && searchResult.artists &&
                                        <div style={{ overflowY: 'scroll', margin: '5px' }}>
                                            {
                                                searchResult.artists.items.map(
                                                    artist =>
                                                        <div key={artist.id} style={{ padding: "1%" }}>
                                                            {artist.name}
                                                            <button onClick={() => addSeed(artist)}>+</button>
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