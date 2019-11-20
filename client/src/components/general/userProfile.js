import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
  Container,
  Card, CardImg, CardTitle, CardText
} from 'reactstrap'

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
            <Card body>
              {
                images && images[0] && <CardImg top width='20%' src={images[0].url} alt={display_name} />
              }
                <CardTitle>{display_name}</CardTitle>
                <CardText>Country: {country}</CardText>
                <CardText>Email: {email}</CardText>                
            </Card>
        }
      </Container>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserProfile;