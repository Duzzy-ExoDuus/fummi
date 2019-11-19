import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getUser } from '../../actions/userActions'

class UserProfile extends Component {
  
  componentDidMount() {
    this.props.getUser(this.props.token)
  }

  render() {
    console.log(this.props)
    return ( 
      <h1>{this.props.user.user.display_name}</h1>
    );
  }
}

UserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => {
  return {token: state.token, user: state.user}
}

export default connect(mapStateToProps, { getUser } )(UserProfile);

