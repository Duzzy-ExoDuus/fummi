import React, {Component} from 'react';
import {Col, Container} from 'reactstrap';
import styled from "styled-components"

const ContinueButton = styled.button`
  background-color: transparent;
  color: rgb(0, 150, 136);
  font-family:"Roboto";
  border:  none;
  font-weight: bolder;
  float:right;
  font-size:18px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const HeaderDiv = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;
  margin-top: -50px;
  font-family: Roboto;
  font-size:large;
  padding: 5% 5% 15px;
  margin-bottom:10px;
`;


class AboutPage extends Component {
  render() {
    return (

        <>
          {console.log("Window width: " + window.innerWidth)}
          <HeaderDiv>Welcome to SeedBox!</HeaderDiv>
          <Container style={{fontFamily: "Montserrat", fontSize: "14px"}}>
            <Col>
              <h3>What is SeedBox?</h3>
              <p>
                Tired of the auto-generated spotify playlists?
                Ever wanted to be in control when creating a new playlist?
              </p>
              <p>
                With SeedBox, you are in control!
                By selecting a few 'seeds' for your playlist and tuning specific attributes,
                SeedBox will grow a personalised playlist for you!
              </p>
              <h3>Your data is safe in SeedBox</h3>
              <p>
                As SeedBox is part of a small research project we store some interaction data, e.g. button presses.
                But don't worry! No personal data is stored whatsoever!
              </p>
            </Col>
            <ContinueButton onClick={() => this.props.history.push("/create")}> continue</ContinueButton>
          </Container>
        </>
    );
  }
}

export default AboutPage;
