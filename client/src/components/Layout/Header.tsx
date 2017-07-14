import * as React from 'react';

import * as Nav from 'react-bootstrap/lib/Nav';
import * as Navbar from 'react-bootstrap/lib/Navbar';
import * as NavItem from 'react-bootstrap/lib/NavItem';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">SomeSchedul.es</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/test">
          <NavItem>Test</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
