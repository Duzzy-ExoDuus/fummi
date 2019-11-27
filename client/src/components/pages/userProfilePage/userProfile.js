import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import profile from '../../../images/profile.png'

import {
  Container,
  Card, CardImg, CardTitle, CardText
} from 'reactstrap'


const StyledCard= styled(Card)`

border-style: solid;
border-color: black;
border-width: 1px;
font-family: 'Montserrat', sans-serif;
font-size: 18px; 
margin-top:5px;
@media screen and (max-width: 800px) {
  width: 100%;
  border-style: normal ;
  border-color: white ;
  border-width: 0px; 
  
  }

`


const H1 = styled.h1`
@media screen and (max-width: 800px) {
  margin-left: 18px;
  margin-top: 25px;
  text-align:left;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 30px;
  padding: 10px;
  &::before {
    background: url(${profile}) no-repeat scroll center center / 100% auto rgba(255, 255, 255, 0);
    filter: brightness(0) invert(1);
    content: "";
    display: inline-block;
    height: 30px;
    margin-right: 13px;
    position: relative;
    top: -4px;
    vertical-align: middle;
    width: 30px;
}

`

const StyledDiv = styled.div`
@media screen and (max-width: 800px) {
  box-shadow: 0px 4px 4px  #51C768;
  width: 100%;
  height: 59px;
  background-color: #51C768;
  color: #FFFFFF;

  }
 
`

class UserProfile extends Component {
  render() {
    const { country, display_name, email, images } = this.props.user.user
    const { loading } = this.props.user.loading
    console.log(images)
    return (
      <Container fluid height='40%'>
        {
          loading ?
            <></>
            :
            <div>
              <StyledDiv>
              <H1>Profile</H1>
              </StyledDiv>
            <StyledCard body>
              {
                images && images[0] && <CardImg top width='20%' src={images[0].url} alt={display_name} />
              }
                <CardTitle>{display_name}</CardTitle>
                <CardText>Country: {country}</CardText>
                <CardText>Email: {email}</CardText>                
            </StyledCard>
            </div>
        }
      </Container>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserProfile;