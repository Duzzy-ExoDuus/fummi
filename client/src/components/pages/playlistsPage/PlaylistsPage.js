import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getUser} from '../../../actions/userActions'
import {fetchPlaylists} from '../../../actions/playlistActions'

import {Container, Row} from 'reactstrap';
import PlaylistList from './PlaylistList';
import styled from 'styled-components'


const GrowPlaylistDiv = styled.div`
    width:80vw;
    height:17vw;
    
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-left:10%;
    margin-right:auto;
    align-items: center;
    justify-content: flex-start;
`;

class UserProfilePage extends Component {

    componentDidMount() {
        this.props.getUser(this.props.token);
        this.props.fetchPlaylists(this.props.token)
    }


    render() {
        return (
            <Container fluid>
                <GrowPlaylistDiv>
                    <Row>
                        <svg onClick={() => this.props.history.push("/create")}
                             style={{marginTop: "-22px", cursor: "pointer"}}
                             width="72" height="80" viewBox="0 0 72 80" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_dd)">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M36 64C51.464 64 64 51.464 64 36C64 20.536 51.464 8 36 8C20.536 8 8 20.536 8 36C8 51.464 20.536 64 36 64Z"
                                      fill="#009688"/>
                                <path
                                    d="M63.75 36C63.75 51.3259 51.3259 63.75 36 63.75C20.6741 63.75 8.25 51.3259 8.25 36C8.25 20.6741 20.6741 8.25 36 8.25C51.3259 8.25 63.75 20.6741 63.75 36Z"
                                    stroke="url(#paint0_linear)" stroke-width="0.5"/>
                                <path
                                    d="M63.75 36C63.75 51.3259 51.3259 63.75 36 63.75C20.6741 63.75 8.25 51.3259 8.25 36C8.25 20.6741 20.6741 8.25 36 8.25C51.3259 8.25 63.75 20.6741 63.75 36Z"
                                    stroke="url(#paint1_linear)" stroke-width="0.5"/>
                            </g>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M43 35H37V29H35V35H29V37H35V43H37V37H43V35Z" fill="white"/>
                            <defs>
                                <filter id="filter0_dd" x="0" y="0" width="72" height="80"
                                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                    <feOffset dy="8"/>
                                    <feGaussianBlur stdDeviation="4"/>
                                    <feColorMatrix type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="4"/>
                                    <feColorMatrix type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                                    <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow"
                                             result="shape"/>
                                </filter>
                                <linearGradient id="paint0_linear" x1="8.27399" y1="8" x2="8.27399" y2="63.452"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stop-opacity="0"/>
                                    <stop offset="0.8" stop-opacity="0.02"/>
                                    <stop offset="1" stop-opacity="0.04"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear" x1="8" y1="8" x2="8" y2="64"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" stop-opacity="0.12"/>
                                    <stop offset="0.2" stop-color="white" stop-opacity="0.06"/>
                                    <stop offset="1" stop-color="white" stop-opacity="0"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <p style={{fontFamily:"Roboto",fontWeight:"semibold", fontSize:"120%"}}>Grow new playlist</p>
                    </Row>
                </GrowPlaylistDiv>
                <PlaylistList playlists={this.props.playlists}/>
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
};

const mapStateToProps = (state) => {
    return {token: state.token.token, user: state.user, playlists: state.playlists.playlists}
};

export default connect(mapStateToProps, {getUser, fetchPlaylists})(UserProfilePage);

