import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



const H1 = styled.h1`
font-size:8vw;
font-family: 'Montserrat', sans-serif;
@media (max-width: 800px) {
  margin-left: 20px;
  font-size:12vw;
}
`


const Div1 = styled.div`
float:left; /* add this */
width:40%;
font-family: 'Montserrat', sans-serif;
margin-top:10px;
@media screen and (max-width: 800px) {
  margin-left: 10px;
  width:100%
}
`
const Div2 = styled.div`
font-family: 'Montserrat', sans-serif;
overflow: hidden; 
margin-top:10px;
@media screen and (max-width: 1000px) {
  margin-left: 10px;
  width:100%

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
  font-family: 'Montserrat', sans-serif;
	font-size: 20px;
	line-height: 22px;
    text-align: center;

@media screen and (max-width: 800px) {
  margin-top:10px;
  display: block;
	margin-left: auto;
  margin-right: auto;

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

          <Div1   >
            <h3 >What is the SeedBox?</h3>
            <p>Read <Link to="/about">about</Link> it here! </p>
          </Div1>
          <Div2 >
            <h3><Link to="/create">Get started</Link> with the SeedBox</h3>
          </Div2>
          <Div3>
            <StyledButton onClick={() => alert('Thanks! Come back later, when we have implemented this ;)')}>Rate our app!</StyledButton>
          </Div3>
      </Container>
    );
  }
}

export default HomePage;