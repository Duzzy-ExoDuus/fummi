import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
      <Navbar color="light" light expand="md" className="mb-5">
        <Container>
          <NavbarBrand>SeedBox</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  tag={Link} onClick={this.close} to="/">Home</NavLink >
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.close} to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.close} to="/profile">My profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.close} to="/create">Create playlist</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Log out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;