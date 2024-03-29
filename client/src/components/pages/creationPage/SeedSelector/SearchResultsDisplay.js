import React, {Component} from 'react';
import SeedTrack from "../../../general/SeedTrack";
import styled from "styled-components"
import Artist from "../../../general/Artist"
import defaultArtistImg from "../../../../images/defaultProfile.png"

const AddSVG = styled.svg`
  float:left;
  width: 10vw;
  margin-top: 5%;
`;

const ArtistDiv = styled.div`
  width:100%;
  overflow: hidden;
`;

const TracksVsArtistDiv = styled.div`
  width: 80vw;
  display:block;
  margin: 3% 10px auto;
`;

const TracksVsArtistButton = styled.button`
  border-radius: 4px;
  border:none;
  color: black; 
  font-family: Montserrat;
  font-weight: lighter;
  margin: 2% 1% 2%;
`;

function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

class SearchResultDisplay extends Component {
    state = {
        trackDisplayed: true,
    };

    render() {
        const {trackDisplayed} = this.state;
        const {searchResult, addSeed} = this.props;
        return (
            <>
                {(searchResult.artists || searchResult.tracks) &&

                    <TracksVsArtistDiv>
                    <TracksVsArtistButton style={{backgroundColor: trackDisplayed ? "#EDEDED" : "transparent"}}
                        onClick={() => this.setState({trackDisplayed: true})}>tracks</TracksVsArtistButton>
                    <TracksVsArtistButton style={{backgroundColor: trackDisplayed ? "transparent" : "#EDEDED"}}
                        onClick={() => this.setState({trackDisplayed: false})}>artists</TracksVsArtistButton>
                </TracksVsArtistDiv>
                }
                <div style={{width: "100%"}}>
                    {
                        this.state.trackDisplayed && searchResult && searchResult.tracks &&
                        <>
                            {

                                removeDuplicates(searchResult.tracks.items,"name")
                                .map(
                                    (track,index) =>
                                        <div key={track.name}>
                                            <SeedTrack key={track} track={track}/>
                                            <AddSVG key={index}
                                                onClick={() => addSeed(track)}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.54" fillRule="evenodd" clipRule="evenodd"
                                                      d="M11 5V11H5V13H11V19H13V13H19V11H13V5H11Z" fill="black"/>
                                            </AddSVG>


                                        </div>
                                )
                            }
                        </>
                    }
                    {
                        (!this.state.trackDisplayed) && searchResult && searchResult.artists &&
                        <ArtistDiv>
                            {
                                searchResult.artists.items.filter((thing, index, self) =>
                                index === self.findIndex((t) => (t.name === thing.name
                                ))
                                ).map(
                                    (artist,index) =>
                                        <div key={artist.name}>
                                            <Artist key={artist}
                                                imgUrl={(artist.images[0] == null) ? defaultArtistImg : artist.images[0].url}
                                                name={artist.name}/>
                                            <AddSVG key={index}
                                                onClick={() => addSeed(artist)}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.54" fillRule="evenodd" clipRule="evenodd"
                                                      d="M11 5V11H5V13H11V19H13V13H19V11H13V5H11Z" fill="black"/>
                                            </AddSVG>
                                        </div>
                                )
                            }
                        </ArtistDiv>
                    }
                </div>
            </>
        );
    }
}

export default SearchResultDisplay;