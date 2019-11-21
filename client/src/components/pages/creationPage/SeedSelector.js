import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { buildUrl } from '../../../util/queryBuilder';

import {
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupButtonDropdown
} from 'reactstrap'

class SeedSelector extends Component {

  state = {
    searchResult: {},
    dropdownOpen: false,
    seedType: 'artist,album,playlist,track'
  }


  getSearchResults = searchString => {
    let headers = { headers: { 'Authorization': 'Bearer ' + this.props.token } }
    let params = {
      q: searchString,
      type: this.state.seedType,
      limit: 5
    }
    console.log(buildUrl('https://api.spotify.com/v1/search', params))
    fetch(buildUrl('https://api.spotify.com/v1/search', params), headers)
      .then(response => response.json())
      .then(searchResult => this.setState({ searchResult }))
      .then(console.log(this.state))
  }

  toggleDropDown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  displaySeedType = () => {
    switch (this.state.seedType) {
      case 'artist': return 'Artist';
      case 'album': return 'Album';
      case 'playlist': return 'playlist';
      case 'track': return 'Track';
      default: return 'All types'
    }
  }

  render() {
    return (
      <Container>
        <InputGroup>
          <Input
            onChange={e => this.getSearchResults(e.target.value)}
          />
          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle caret >
              {this.displaySeedType()}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select the type of seed</DropdownItem>
              <DropdownItem onClick={() => this.setState({ seedType: 'artist,album,playlist,track' })}>All types</DropdownItem>
              <DropdownItem onClick={() => this.setState({ seedType: 'artist' })}>Artist</DropdownItem>
              <DropdownItem onClick={() => this.setState({ seedType: 'album' })}>Album</DropdownItem>
              <DropdownItem onClick={() => this.setState({ seedType: 'playlist' })}>Playlist</DropdownItem>
              <DropdownItem onClick={() => this.setState({ seedType: 'track' })}>Track</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
      </Container>
    );
  }
}

SeedSelector.propTypes = {
  token: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return { token: state.token.token }
}

export default connect(mapStateToProps)(SeedSelector);