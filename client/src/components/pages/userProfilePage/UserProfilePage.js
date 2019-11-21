import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getUser } from '../../../actions/userActions'
import { fetchPlaylists } from '../../../actions/playlistActions'

import { Container, Row, Col } from 'reactstrap';
import PlaylistList from './PlaylistList';
import UserProfile from './userProfile'

class UserProfilePage extends Component {

  componentDidMount() {
    this.props.getUser(this.props.token)
    this.props.fetchPlaylists(this.props.token)
  }

  render() {
    console.log(this.props.user)
    return (
      <Container fluid>
        <Row>
          <Col>
            <UserProfile user={this.props.user} />
          </Col>
          <Col>
            <PlaylistList playlists={this.props.playlists} />
          </Col>
        </Row>
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

