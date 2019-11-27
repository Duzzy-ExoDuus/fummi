import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Container, Row, Col, Button } from 'reactstrap'


class Song extends Component {

  state = {
    audiofeatures: {},
    playingPreview: false
  }

  componentDidMount() {
  }

  getAudioFeatures = () => {
    let headers = { headers: { 'Authorization': 'Bearer ' + this.props.token } }
    const { id } = this.props.song
    fetch(`https://api.spotify.com/v1/audio-features/${id}`, headers)
      .then(response => response.json())
      .then(audiofeatures => this.setState({ audiofeatures })
      )
  }

  render() {
    const { artists, name, preview_url } = this.props.song
    let artistList = artists.map(artist => artist.name + ', ')
    artistList[artistList.length-1] = artistList[artistList.length-1].substring(0, artistList[artistList.length-1].length-2)
    return (
      <Container>
        <Row>
          <Col>
            {name}
          </Col>
          <Col>
            {
              artistList
            }
          </Col>
          {
            preview_url &&
            <Button onClick={() => this.setState({ playingPreview: !this.state.playingPreview })} >
              Preview
            </Button>
          }{
            this.state.playingPreview &&
            <iframe title={preview_url} src={preview_url} style={{ display: 'none' }} allow="encrypted-media" />
          }
        </Row>
      </Container>
    );
  }
}

Song.propTypes = {
  token: PropTypes.string.isRequired,
  song: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(Song);