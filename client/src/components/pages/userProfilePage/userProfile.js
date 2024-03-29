import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import profile from '../../../images/profile.png'
import me from '../../../images/defaultProfile.png'

import { Container } from 'reactstrap'
import Card from "reactstrap/es/Card";
import CardImg from "reactstrap/es/CardImg";
import CardTitle from "reactstrap/es/CardTitle";
import CardText from "reactstrap/es/CardText";


const StyledCard= styled(Card)`

border-style: solid;
border-color: black;
border-width: 1px;
font-size: 18px; 
margin-top:5px;
@media screen and (max-width: 500px) {
  font-family:"Montserrat", sans-serif;
  font-size: 15px; 
  width: 100%;
  border-style: normal ;
  border-color: white ;
  border-width: 0px; 
  
  }

`


const H1 = styled.h1`
@media screen and (max-width: 500px) {
  visibility: hidden;
  margin-left: 18px;
  text-align:left;
  font-family:"Montserrat", sans-serif;
  font-weight: 100;
  font-size: 30px;
  padding:10px;
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
const StyledDivH1 = styled.div`
@media screen and (max-width: 500px) {
  width: 100%;
  color: black;
  }
`


const ProfileImage = styled(CardImg)`
  @media screen and (max-width: 500px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    margin-top:-80px
    width: 130px;
  }
`
const DefaultProfileImage = styled.div`
  @media screen and (max-width: 500px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 130px;
    margin-top:-80px
    content: url(${me});

  }
`


class UserProfile extends Component {
  render() {
    const { country, display_name, email, images } = this.props.user.user
    const { loading } = this.props.user.loading
    return (
      <Container fluid>
        {
          loading ?
            <></>
            :
            <div>
                <StyledDivH1>
                  <H1>Profile</H1>
                </StyledDivH1>

                <StyledCard body>
                  {
                    images && images[0] && <ProfileImage top width='20%' src={images[0].url} alt={display_name} />? images && images[0] && <ProfileImage top width='20%' src={images[0].url} alt={display_name} />:
                        <DefaultProfileImage/>
                  }
                  <CardTitle><strong>{display_name}</strong></CardTitle>
                  <CardText><strong>Country: </strong> {country}</CardText>
                  <CardText><strong>Email: </strong>{email}</CardText>
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