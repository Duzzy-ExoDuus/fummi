import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'


const StyledLink = styled(Link)`
color: white;
text-decoration: none;
font-size:20px;
padding: 10px;
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
      <Navbar style={{backgroundColor: 'black'}} light expand="md" className="mb-5">
        <Container>
          <NavbarBrand style={{color: 'white'}}> Seedbox</NavbarBrand>
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
                <StyledLink tag={Link} onClick={this.close} to="/profile">My profile</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink tag={Link} onClick={this.close} to="/create">Create playlist</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink href="/">Log out</StyledLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;