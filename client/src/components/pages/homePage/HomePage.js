import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



const H1 = styled.h1`
font-size:8vw;

@media (max-width: 800px) {
  margin-left: 10px;
  font-size:12vw;
}

`



class HomePage extends Component {
  state = {}
  render() {
    
    return (
      <Container>
        <Row className='md'>
          <H1>Welcome!</H1>
        </Row>

        <Row >
          <Col   >
            <h3 >What is the SeedBox?</h3>
            <p>Read <Link to="/about">about</Link> it here! </p>
          </Col>
          <Col >
            <h3><Link to="/create">Get started</Link> with the SeedBox</h3>
          </Col>
          <Col>
            <Button onClick={() => alert('Thanks! Come back later, when we have implemented this ;)')}>Rate our app!</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;