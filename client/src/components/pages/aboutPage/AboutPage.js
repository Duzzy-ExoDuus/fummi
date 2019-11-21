import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import logo from '../../../assets/seedbox.png'


class AboutPage extends Component {
  render() {
    return (
      <Container>
        <Col>
          <Row>
            <h1>Welcome to the Seedbox!</h1>
            <img src={logo} alt='Logo' className='responsive' width='30%' />
          </Row>
          <h2>What is the Seedbox?</h2>
          <p>
            Tired of the auto-generated spotify playlists?
            Ever wanted to be in control when creating a new playlist?
          </p>
          <p>
            In the Seedbox, you are in control!
            By selecting a few 'seeds' for your playlist and tuning specific attributes,
            Seedbox will grow a personalised playlist for you!
          </p>
          <h2>Your data is safe in the Seedbox</h2>
          <p>
            As the Seedbox is part of a small research project we store some interaction data, e.g. button presses.
            But don't worry! No personal data is stored whatsoever!
          </p>
        </Col>
      </Container>
    );
  }
}

export default AboutPage;