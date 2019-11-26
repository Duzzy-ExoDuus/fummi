import React from 'react';
import { Jumbotron } from 'reactstrap';

import Button from '../../general/LoginButton'
import logo from "../../../images/logo.png"
import styled from 'styled-components'


const H1 = styled.h1`
margin-top: 50px;
text-align: center;
font-size:8vw;
color: #8B9358;
font-family: 'Courier New', Courier, monospace;
  
@media (max-width: 800px) {
  font-size:12vw;
}
`
const LogoImage = styled.img`
  display: block;
	margin-left: auto;
	margin-right: auto;
  width: 25%;
  
  @media (max-width: 800px) {
    width: 50%;
  }
`


const LoginPage = () =>
  <Jumbotron>
      <LogoImage id="logo" src={logo} alt="fireSpot" />
       <H1>SeedBox</H1>    <hr />
 
    <Button
      onClick={() => {
        window.location = window.location.href.includes('localhost')
          ? 'http://localhost:5000/login'
          : 'https://fummi-backend.herokuapp.com/login'
      }}>
      Login to spotify
      </Button>
  </Jumbotron>

export default LoginPage;