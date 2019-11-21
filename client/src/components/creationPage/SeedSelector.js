import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import {
  Container, Input, InputGroup,
  DropdownToggle, DropdownMenu, DropdownItem, InputGroupButtonDropdown
} from 'reactstrap'

import { buildUrl } from '../../util/queryBuilder';

/* TODO re-emit search when seed type is changed */
class SeedSelector extends Component {

  state = {
    searchResult: {},
    dropdownOpen: false,
    seedType: 'artist'
  }

  inputRef = React.createRef()

  getSearchResults = () => {
    let headers = { headers: { 'Authorization': 'Bearer ' + this.props.token } }
    let params = {
      q: this.inputRef.value,
      type: this.state.seedType,
      limit: 5
    }
    fetch(buildUrl('https://api.spotify.com/v1/search', params), headers)
      .then(response => response.json())
      .then(searchRes => console.log(searchRes))
  }

  toggleDropDown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  render() {
    return (
      <Container>
        <InputGroup>
          <Input ref={this.inputRef}
            value={this.state.searchString}
            onChange={() => this.getSearchResults()}
          />
          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle caret >
              {this.state.seedType}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select the type of seed</DropdownItem>
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