import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Container,
  Card, CardImg, CardTitle, CardText
} from 'reactstrap'


const StyledCard= styled(Card)`

`

const H1 = styled.h1`
margin-top: 10px;
@media screen and (max-width: 800px) {
  margin-top: 20px;
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
              <H1>Profile</H1>
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