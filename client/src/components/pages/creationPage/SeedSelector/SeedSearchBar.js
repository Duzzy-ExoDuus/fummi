import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Container, InputGroup, Input, Modal, ModalHeader, ModalBody, Button, InputGroupAddon } from 'reactstrap'
import SearchResultDisplay from './SearchResultsDisplay'

import { buildUrl } from '../../../../util'

class SearchBar extends Component {
  state = {
    modal: false,
    searchResult: {}
  }

  toggle = () => { this.setState({ modal: !this.state.modal }) }

  getSearchResults = searchString => {
    if (!searchString) {
      this.setState({ searchResult: null })
      return
    }
    let headers = { headers: { 'Authorization': 'Bearer ' + this.props.token } }
    let params = { q: searchString, type: 'artist,track', limit: 5 }
    fetch(buildUrl('https://api.spotify.com/v1/search', params), headers)
      .then(response => response.json())
      .then(searchResult => this.setState({ searchResult })
      )
  }

  render() {
    return (
      <Container>
        <InputGroup>
          <Input onChange={e => this.getSearchResults(e.target.value)} />
          <InputGroupAddon addonType="prepend">
            <Button onClick={this.toggle}>Seeds?</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>What is a seed?</ModalHeader>
              <ModalBody>
                A seed is either a track or artist. Based on your selections, a playlist with appropriate characteristics will be grown.
                The track attributes below give an indication as to what specific attributes your seeds represent.
              </ModalBody>
            </Modal>
          </InputGroupAddon>
        </InputGroup>
        <SearchResultDisplay searchResult={this.state.searchResult} addSeed={this.props.addSeed} />
      </Container>
    );
  }
}

SearchBar.propTypes = {
  token: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(SearchBar);