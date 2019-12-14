import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import SearchResultDisplay from './SearchResultsDisplay'

import {buildUrl} from '../../../../util'
import styled from "styled-components"

const SearchInput = styled.input`
  width:80vw;
  padding-left: 5%;
  display: block;
  margin-left:2%;
  border : 1px solid #919191;
  border-radius: 2000px;
  ::placeholder{
    
  };
  :focus::placeholder{
  color:transparent;
  }
`;




class SearchBar extends Component {
    state = {
        modal: false,
        searchResult: {},
        searchString: "",
        trackDisplayed: true,
    };

    toggle = () => {
        this.setState({modal: !this.state.modal})
    };

    getSearchResults = searchString => {
        this.setState({searchString});
        if (!searchString) {
            this.setState({searchResult: {}});
            return
        }
        const headers = {headers: {'Authorization': 'Bearer ' + this.props.token}};
        const params = {q: searchString, type: 'artist,track', limit: 5};
        fetch(buildUrl('https://api.spotify.com/v1/search', params), headers)
            .then(response => response.json())
            .then(searchResult => this.setState({searchResult})
            )
    };

    addAndClear = seed => {
        this.props.addSeed(seed);
        this.setState({searchString: "", searchResult: {}})
    };

    render() {
        return (
            <>
                <SearchInput
                    onChange={e => {
                        this.getSearchResults(e.target.value)
                    }}
                    value={this.state.searchString}

                    placeholder="Search an artist/track"/>

                {/*<button onClick={() => console.log(this.state)}>debvug</button>*/}


                <SearchResultDisplay searchResult={this.state.searchResult} addSeed={this.addAndClear}/>
            </>
        );
    }
}

SearchBar.propTypes = {
    token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {token: state.token.token}
};

export default connect(mapStateToProps)(SearchBar);