import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Container, Progress} from 'reactstrap'
import defaultArtistImg from "../../../images/defaultProfile.png";


class SeedDisplay extends Component {
    render() {
        const {seeds, removeSeed} = this.props
        return (
            <Container>
                <div style={{display: 'flex', width: "80%"}}>
                    {
                        seeds.map(
                            seed =>
                                <div key={seed.id} style={{margin: '2px'}}>

                                    <svg width="57" height="65" viewBox="0 0 57 65" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M25.4149 14.4468C24.1621 20.0073 29.8025 24.1231 20.1061 42.7358C22.0886 38.9311 24.8077 24.6022 24.4074 26.1794C25.8159 20.6287 25.8768 13.314 23.5161 13.7927C-9.41199 20.4689 -7.52565 71.8588 27.698 63.6259C54.0999 57.46 44.1687 12.0341 44.1687 12.0341C44.1687 12.0341 25.9814 11.9315 25.4149 14.4468Z"
                                              fill="#7D2E07"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M25.4149 14.4468C24.1621 20.0073 29.8025 24.1231 20.1061 42.7358C22.0886 38.9311 24.8077 24.6022 24.4074 26.1794C25.8159 20.6287 25.8768 13.314 23.5161 13.7927C-9.41199 20.4689 -7.52565 71.8588 27.698 63.6259C54.0999 57.46 44.1687 12.0341 44.1687 12.0341C44.1687 12.0341 25.9814 11.9315 25.4149 14.4468Z"
                                              fill={"url(#pattern"+seed.id+")"}/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M25.4149 14.4468C24.1621 20.0073 29.8025 24.1231 20.1061 42.7358C22.0886 38.9311 24.8077 24.6022 24.4074 26.1794C25.8159 20.6287 25.8768 13.314 23.5161 13.7927C-9.41199 20.4689 -7.52565 71.8588 27.698 63.6259C54.0999 57.46 44.1687 12.0341 44.1687 12.0341C44.1687 12.0341 25.9814 11.9315 25.4149 14.4468Z"
                                              fill="url(#paint0_linear)"/>
                                        <path d="M40 8H51V18H40V8Z" fill="white"/>
                                        <path onClick={() => removeSeed(seed)}
                                              d="M45 2C39.48 2 35 6.48 35 12C35 17.52 39.48 22 45 22C50.52 22 55 17.52 55 12C55 6.48 50.52 2 45 2ZM50 13H40V11H50V13Z"
                                              fill="#A01313"/>
                                        <defs>
                                            <pattern id={"pattern"+seed.id} patternContentUnits="objectBoundingBox" width="1"
                                                     height="1">
                                                <use href={"#image"+seed.id}
                                                     transform="translate(-0.0704711) scale(0.00158464 0.00138889)"/>
                                            </pattern>
                                            <linearGradient id="paint0_linear" x1="22.9993" y1="12.0335" x2="22.9993"
                                                            y2="64.5164" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#9D9D9D"/>
                                                <stop offset="1" stop-color="#575757" stop-opacity="0"/>
                                            </linearGradient>
                                            <image id={"image"+seed.id} width="720" height="720"
                                                   href={(seed.images == null) ? seed.album.images[0].url : (seed.images[0] == null ? defaultArtistImg : seed.images[0].url)}/>
                                        </defs>
                                    </svg>
                                </div>
                        )
                    }
                </div>
                {
                    seeds.length > 0
                        ?
                        <Progress color="gray" value={20 * seeds.length}/>
                        :
                        <p style={{fontFamily:"Roboto",marginTop:"4%",marginLeft:"0%"}}>You haven't picked any seeds yet</p>
                }
            </Container>
        );
    }
}

SeedDisplay.propTypes = {
    seeds: PropTypes.array.isRequired,
    removeSeed: PropTypes.func.isRequired
}

export default SeedDisplay;