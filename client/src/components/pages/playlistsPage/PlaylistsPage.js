import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getUser } from '../../../actions/userActions'
import { fetchPlaylists } from '../../../actions/playlistActions'

import { Container, Row, Col , Button} from 'reactstrap';
import PlaylistList from './PlaylistList';
import styled from 'styled-components'




const StyledButton = styled.button`
  background-color: #9C9C9C; 
  border-radius: 65px;
  height : 50px;
  width : 50px;
  font-size:50px
  font-family: "Montserrat", sans-serif;
  font-weight:700;
  color:white;
  text-align: center;
  float:right;
  margin-top:-10px;
  line-height:2px;
`
class UserProfilePage extends Component {

    componentDidMount() {
        this.props.getUser(this.props.token)
        this.props.fetchPlaylists(this.props.token)
    }


    render() {
        return (
            <Container fluid>
                <div style={{padding:"40px"}}> <StyledButton>+</StyledButton></div>
                <div>
                    <PlaylistList playlists={this.props.playlists} />
                </div>
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

