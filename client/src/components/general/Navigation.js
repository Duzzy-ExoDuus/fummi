import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../images/logo.png'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap'


const StyledLink = styled(Link)`
color: black;
font-family: Montserrat;
display:block;
margin-left:auto;
margin-right:auto;
text-decoration: none;
font-size:15px;
text-align:center;
padding: 5px;
  :hover{
    color:gray;
    text-decoration: none;
  }
  `;

class NavBar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  close= () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <Navbar style={{backgroundColor: "#E0E0E0", marginBottom:0}} light expand="md" className="mb-5">
        <Container>
          <NavbarBrand style={{fontFamily:"Montserrat", fontWeight :"lighter", color: 'black'}}>
              <img src={logo} style={{width:50, marginTop: -7}} alt="seedbox" /> SeedBox
          </NavbarBrand>
          <NavbarToggler style={{backgroundColor: 'white'}} onClick={this.toggle} />
          <Collapse  isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <StyledLink  tag={Link} onClick={this.close} to="/">Home</StyledLink >
              </NavItem>
              <NavItem>
                <StyledLink tag={Link} onClick={this.close} to="/about">About</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink tag={Link} onClick={this.close} to="/playlists">My playlists</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink tag={Link} onClick={this.close} to="/create">Create playlist</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink href="/" to="/">LogOut</StyledLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;