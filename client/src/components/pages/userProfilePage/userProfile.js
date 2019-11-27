import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Container,
  Card, CardImg, CardTitle, CardText
} from 'reactstrap'


const StyledCard= styled(Card)`

border-style: solid;
border-color: black;
border-width: 1px;
font-family:'Courier New', Courier, monospace;
font-size: 18px; 

@media screen and (max-width: 400px) {
  width: 100%;

  border-style: normal ;
  border-color: white ;
  border-width: 0px; 
  }
@media screen  and (min-width: 400px) and (max-width: 850px)  {
  width: 100%;
 
  border-style: normal ;
  border-color: white ;
  border-width: 0px; 

}
`


const H1 = styled.h1`
@media screen and (max-width: 400px) {
  margin-left: 20px;
}
@media screen  and (min-width: 400px) and (max-width: 800px)  {
  margin-left: 20px;
}
`

const StyledDiv = styled.div`
@media screen and (max-width: 400px) {

  width: 100%;
  height: 59px;
  
  background-color: #8B9358;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;

  }
  @media screen  and (min-width: 400px) and (max-width: 800px)  {

    width: 100%;
    height: 59px;
      background-color: #8B9358;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
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