import React, {Component, useRef} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import SearchResultDisplay from './SearchResultsDisplay'

import {buildUrl} from '../../../../util'
import styled from "styled-components"

const SearchInput = styled.input`
  width:90vw;
  padding-left: 5%;
  display: block;
  margin:auto;
  border : 1px solid #919191;
  border-radius: 4px;
  ::placeholder{
    
  };
  :focus::placeholder{
  color:transparent;
  }
`;

const SearchContainer = styled.div`
    margin:auto;
    display: grid;
    grid-template-columns:1.5rem 4fr 1fr;
    width:300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    :focus-within i {
    display: none;
    }
    :focus-within .searchBox{
    grid-column:1/4;
    }
    :focus-within .searchBox::placeholder {
    color:transparent;
    }
`;

const SearchIcon = styled.svg`
    grid-row:1;
    grid-column:1/2;
    z-index:2;
    padding: 70% 0.5rem 0.5rem;
`;

const SearchBox = styled.input`
    border: 0;
    padding: 0.5rem;
    grid-column:2/4;
    grid-row:1;
    outline:none;
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
    constructor() {
        super();

        this.searchInput = React.createRef();
    }

    componentDidMount() {
        this.searchInput.current.focus();
    }

    render() {

        return (
            <>

                <SearchContainer onClick={()=>this.searchInput.current.focus()}>
                    <SearchIcon width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd" d="M15.502 14H14.708L14.432 13.726C15.407 12.589 16 11.115 16 9.50003C16 5.91003 13.09 3.00003 9.5 3.00003C5.91 3.00003 3 5.91003 3 9.50003C3 13.09 5.91 16 9.5 16C11.115 16 12.588 15.408 13.725 14.434L14.001 14.708V15.5L18.999 20.491L20.49 19L15.502 14ZM9.5 14C7.014 14 5 11.986 5 9.50003C5 7.01503 7.014 5.00003 9.5 5.00003C11.985 5.00003 14 7.01503 14 9.50003C14 11.986 11.985 14 9.5 14Z" fill="black"/>
                    </SearchIcon>
                    <SearchBox ref={this.searchInput} onChange={e => {
                        this.getSearchResults(e.target.value)
                    }} value={this.state.searchString} placeholder="Search..." />
                </SearchContainer>

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