import React, { Component } from 'react';
import { Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const H1 = styled.h1`
font-size:8vw;
font-family: "Montserrat", sans-serif;
@media (max-width: 500px) {
  visibility: visible;
  display: block;
	margin-left: auto;
  margin-right: auto;
  font-size:12vw;
  font-family:"Montserrat", sans-serif;
}
`

const H3 = styled.h3`

@media (max-width: 500px) {
  font-size:7vw;
}
`


const Div1 = styled.div`
float:left; /* add this */
width:40%;
font-family: "Montserrat", sans-serif;
margin-top:10px;
@media screen and (max-width: 500px) {
  margin-top:10px;
  margin-left: 10px;
  width:100%
  font-family:"Montserrat", sans-serif;
}
`
const Div2 = styled.div`
font-family: "Montserrat", sans-serif;
overflow: hidden; 
margin-top:10px;
@media screen and (max-width: 500px) {
  margin-top:100px;
  margin-left: 10px;
  width:100%
  padding-top: 25px;
  padding-right: 20px;
  font-family:"Montserrat", sans-serif;
}
`

const Div3 = styled.div`

`

const StyledButton = styled.button`
margin-top:10px;
  background-color: #9C9C9C; 
	border: none;
	color: white;
  padding: 15px; 
	text-decoration: none;
	cursor: pointer;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
	font-size: 20px;
	line-height: 22px;
    text-align: center;

@media screen and (max-width: 500px) {
  margin-top:50px;
  display: block;
	margin-left: auto;
  margin-right: auto;
  visibility: visible;

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

          <Div1  >
            <H3 >What is the SeedBox?</H3>
            <p>Read <Link to="/about">about</Link> it here! </p>
          </Div1>
          <Div2 >
            <H3><Link to="/create">Get started</Link> with the SeedBox</H3>
          </Div2>
          <Div3>
            <StyledButton>Rate our app!</StyledButton>
          </Div3>
      </Container>
    );
  }
}

export default HomePage;