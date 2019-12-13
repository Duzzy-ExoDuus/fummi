import React, { Component } from 'react';
import Track from '../../../general/Track';
import SeedTrack from "../../../general/SeedTrack";
import styled from "styled-components"

const AddSVG = styled.svg`
  float:left;
  width: 10vw;
`

const ArtistDiv = styled.div`
  width:100%;
  overflow: hidden;
`

class SearchResultDisplay extends Component {

    render() {
        const { searchResult, addSeed } = this.props;
        return (
            <>

                <div style={{  width: "100%"}}>
                    {
                        searchResult && searchResult.tracks &&
                        <>
                            <h3>Track</h3>
                            <hr />
                            {
                                searchResult.tracks.items.map(
                                    track =>
                                        <div>
                                            <SeedTrack track={track}/>
                                            <AddSVG
                                                onClick={() => addSeed(track)}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd" d="M11 5V11H5V13H11V19H13V13H19V11H13V5H11Z" fill="black"/>
                                            </AddSVG>


                                        </div>
                                )
                            }
                        </>
                    }
                    {
                        searchResult && searchResult.artists &&
                        <ArtistDiv>
                            <h3>Artist</h3>
                            <hr />
                            {
                                searchResult.artists.items.map(
                                    artist =>
                                    <>
                                        {artist.name}
                                        <button onClick={() => addSeed(artist)}>+</button>
                                    </>
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