import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Container } from 'reactstrap'

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
              {
                images && images[0] && <img src={images[0].url} alt={display_name} />
              }
              {display_name}
              {country}
              {email}
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