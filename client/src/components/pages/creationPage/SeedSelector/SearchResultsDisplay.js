import React, {Component} from 'react';
import {Button, Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap'
import Track from '../../../general/Track';

class SearchResultDisplay extends Component {

    render() {
        const {searchResult, addSeed} = this.props;
        return (
            <Container>
                <div style={{display: 'flex', overflow: 'hidden', margin: 'none', padding: 'none'}}>
                    <Row>
                        <Col sm="6">
                            <ListGroup>
                                <ListGroupItem>
                                    <h3>Track</h3>
                                    <hr/>
                                    {
                                        searchResult && searchResult.tracks &&
                                        <div style={{overflowY: 'scroll', margin: '5px'}}>
                                            {
                                                searchResult.tracks.items.map(
                                                    track =>
                                                        <div style={{padding:"1%"}} key={track.id} onClick={() => addSeed(track)}>
                                                            <Track track={track}/>
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
                                    <hr/>
                                    {
                                        searchResult && searchResult.artists &&
                                        <div style={{overflowY: 'scroll', margin: '5px'}}>
                                            {
                                                searchResult.artists.items.map(
                                                    artist =>
                                                        <div key={artist.id} style={{padding:"1%"}}>
                                                            <Row>
                                                                <Col xs="8">
                                                                    {artist.name}
                                                                </Col>
                                                                <Col xs="4">
                                                                    <Button color='success'
                                                                            onClick={() => addSeed(artist)}>+</Button>
                                                                </Col>
                                                            </Row>
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