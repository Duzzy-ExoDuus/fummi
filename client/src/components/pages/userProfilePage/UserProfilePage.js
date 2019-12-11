import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getUser } from '../../../actions/userActions'
import { fetchPlaylists } from '../../../actions/playlistActions'

import { Container } from 'reactstrap';
import UserProfile from './userProfile'
import styled from 'styled-components'



const Div1 = styled.div`
float:left; 
width:40%;
@media screen and (max-width: 500px) {
  width:100%
}

`

class UserProfilePage extends Component {

  componentDidMount() {
    this.props.getUser(this.props.token)
    this.props.fetchPlaylists(this.props.token)
  }


  render() {
    return (
      <Container fluid>
          <Div1>
            <UserProfile user={this.props.user} />
          </Div1>
      </Container>
    );
  }
}

UserProfilePage.propTypes = {
  getUser: PropTypes.func.isRequired,
  fetchPlaylists: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return { token: state.token.token, user: state.user, playlists: state.playlists.playlists }
}

export default connect(mapStateToProps, { getUser, fetchPlaylists })(UserProfilePage);