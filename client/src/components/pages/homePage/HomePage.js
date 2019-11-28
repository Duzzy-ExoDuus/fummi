import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import thinking from '../../../images/thinking.png'
import pointing from '../../../images/pointing.png'
import rateUs from '../../../images/rateUs.png'
import welcomeImage from '../../../images/welcome.png'



const H1 = styled.h1`
font-size:8vw;
font-family: 'Montserrat', sans-serif;
@media (max-width: 500px) {
  visibility: hidden;
  display: block;
	margin-left: auto;
  margin-right: auto;
  font-size:12vw;
  font-family:"Arial Rounded MT Bold", Arial, Helvetica, sans-serif;
}
`


const Div1 = styled.div`
float:left; /* add this */
width:40%;
font-family: 'Montserrat', sans-serif;
margin-top:10px;
@media screen and (max-width: 500px) {
  margin-top:10px;
  margin-left: 10px;
  width:100%
  font-family:"Arial Rounded MT Bold", Arial, Helvetica, sans-serif;


}
`
const Div2 = styled.div`
font-family: 'Montserrat', sans-serif;
overflow: hidden; 
margin-top:10px;
@media screen and (max-width: 500px) {
  margin-top:100px;
  margin-left: 10px;
  width:100%
  padding-top: 25px;
  padding-right: 20px;
  font-family:"Arial Rounded MT Bold", Arial, Helvetica, sans-serif;

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

@media screen and (max-width: 500px) {
  margin-top:50px;
  display: block;
	margin-left: auto;
  margin-right: auto;
  visibility: hidden;

}
`


const DivImage1 = styled.div`
  @media screen and (max-width: 500px) {
    float: left;
    padding:5px;
    width: 60px;
    content: url(${thinking});
  }
`
const DivImage2 = styled.div`
  @media screen and (max-width: 500px) {
    float:right;
    padding:5px;
    margin-left:-10px;
    margin-top:-30px;
    width: 70px;
    content: url(${pointing});
  }
`

const DivImage3 = styled.div`
  @media screen and (max-width: 500px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top:30px;

    padding:5px;
    width: 250px;
    content: url(${rateUs});
  }
`


const DivImage4 = styled.div`
  @media screen and (max-width: 500px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top:-70px;
    padding:5px;
    width: 200px;
    content: url(${welcomeImage});
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
        <DivImage4 />

          <Div1  >
          <DivImage1 id="logo"  />
            <h3 >What is the SeedBox?</h3>
            <p>Read <Link to="/about">about</Link> it here! </p>
          </Div1>
          <Div2 >
          <DivImage2 id="logo"/>
            <h3><Link to="/create">Get started</Link> with the SeedBox</h3>
          </Div2>
          <Div3>
          <DivImage3  onClick={() => alert('Thanks! Come back later, when we have implemented this ;)')} id="logo"/>
            <StyledButton>Rate our app!</StyledButton>
          </Div3>
      </Container>
    );
  }
}

export default HomePage;