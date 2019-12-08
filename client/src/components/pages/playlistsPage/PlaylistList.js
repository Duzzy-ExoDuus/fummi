import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Container, ListGroup} from 'reactstrap';
import styled from 'styled-components'


const ListItem = styled.div`
    width:80vw;
    height:24vw;
    
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
    flex-direction: column;
    margin-left:auto;
    margin-right:auto;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const CoverImage = styled.img`
    width: 100%;
    padding:10%;
`;

const CoverImageDiv = styled.div`
    cursor:pointer;
    flex: 0 0 100%;
    order:0;
    width:30%;
`;

const NameHeader = styled.h1`
    font-size:16px;
    font-weight:medium;
    margin:auto;
    vertical-align:middle;
    line-height:300%;
`;

const NameDiv = styled.div`
    flex: 0 0 50%;
    order:2;
    width: 60%;
`;

const InfoDiv = styled.div`
    flex: 0 0 50%;
    font-size:80%;
    order:2;
    width:60%;
`;

const OptionDiv = styled.div`
    flex: 0 0 100%;
    order:3;
    width:10%;
`;

class PlaylistList extends Component {

    render() {
        const {items, loading} = this.props.playlists;
        let playlistsToRender = items ?
            items.map(item =>
                <ListItem>
                    <CoverImageDiv><CoverImage src={item.images[0].url}/></CoverImageDiv>
                    <NameDiv><NameHeader>{item.name}</NameHeader></NameDiv>
                    <InfoDiv>{item.tracks.total} tracks</InfoDiv>
                    <OptionDiv>
                        <svg style={{marginTop: "100%", cursor: "pointer"}} width="18" height="36" viewBox="0 0 12 24"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd"
                                  d="M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z"
                                  fill="black"/>
                        </svg>
                    </OptionDiv>
                </ListItem>
            )
            : [];


        return (
            <Container fluid>
                {
                    loading ?
                        <></>
                        :
                        <>
                            <ListGroup>
                                {playlistsToRender}
                            </ListGroup>
                        </>
                }
            </Container>
        );
    }
}

PlaylistList.propTypes = {
    playlists: PropTypes.object.isRequired
};

export default PlaylistList;