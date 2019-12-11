import React, { Component } from 'react';
import Track from '../../../general/Track';

class SearchResultDisplay extends Component {

    render() {
        const { searchResult, addSeed } = this.props;
        return (
            <>
                <div style={{ display: 'flex' }}>
                    {
                        searchResult && searchResult.tracks &&
                        <>
                            <div style={{ overflow: 'hidden', margin: '5px' }}>
                                <h3>Track</h3>
                                <hr />
                                {
                                    searchResult.tracks.items.map(
                                        track =>
                                            <div style={{ padding: "1%" }} key={track.id}>
                                                <Track track={track} />
                                                <button onClick={() => addSeed(track)}>+</button>
                                            </div>
                                    )
                                }
                            </div>
                        </>
                    }
                    {
                        searchResult && searchResult.artists &&
                        <>
                            <h3>Artist</h3>
                            <hr />
                            <div style={{ overflow: 'hidden', margin: '5px' }}>
                                {
                                    searchResult.artists.items.map(artist =>
                                        <div key={artist.id} style={{ padding: "1%" }}>
                                            {artist.name}
                                            <button onClick={() => addSeed(artist)}>+</button>
                                        </div>)
                                }
                            </div>
                        </>
                    }
                </div>
            </>
        );
    }
}

export default SearchResultDisplay;