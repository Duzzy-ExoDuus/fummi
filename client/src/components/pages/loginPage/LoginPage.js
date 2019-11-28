import React from 'react';
import { Container } from 'reactstrap';

import Button from './LoginButton'
import logo from "../../../images/logo.png"
import styled from 'styled-components'


const LogoImage = styled.img`
margin-top: 50px;
  display: block;
	margin-left: auto;
	margin-right: auto;
  width: 25%;
  
  @media (max-width: 450px) {
    width: 80%;
  }
`

const H1 = styled.h1`
margin-top: 50px;
text-align: center;
font-size:8vw;
color: #8B9358;
font-family: 'Courier New', Courier, monospace;
  
@media (max-width: 450px) {
  font-size:18vw;
}
`



const LoginPage = () =>
  <Container>
      <LogoImage id="logo" src={logo} alt="fireSpot" />
       <H1>SeedBox</H1>    
 
    <Button
      onClick={() => {
        window.location = window.location.href.includes('localhost')
          ? 'http://localhost:5000/login'
          : 'https://fummi-backend.herokuapp.com/login'
      }}>
      Login to spotify
      </Button>
  </Container>

export default LoginPage;