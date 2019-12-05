import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import logo from '../../../assets/seedbox.png'


class AboutPage extends Component {
  render() {
    return (
      <Container style={{fontFamily:"Montserrat"}}>
        <Col>
          <Row>
            <h1>Welcome to SeedBox!</h1>
          </Row>
          <h2>What is SeedBox?</h2>
          <p>
            Tired of the auto-generated spotify playlists?
            Ever wanted to be in control when creating a new playlist?
          </p>
          <p>
            With SeedBox, you are in control!
            By selecting a few 'seeds' for your playlist and tuning specific attributes,
            SeedBox will grow a personalised playlist for you!
          </p>
          <h2>Your data is safe in SeedBox</h2>
          <p>
            As SeedBox is part of a small research project we store some interaction data, e.g. button presses.
            But don't worry! No personal data is stored whatsoever!
          </p>
        </Col>
      </Container>
    );
  }
}

export default AboutPage;