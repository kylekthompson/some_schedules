import React from 'react';

import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const renderSignedInNavItems = (requestSignOut) => ([
  (
    <NavItem key="signOut" onClick={requestSignOut}>Sign Out</NavItem>
  ),
]);

const renderSignedOutNavItems = () => ([
  (
    <LinkContainer exact key="sign-up" to="/sign-up">
      <NavItem>Sign Up</NavItem>
    </LinkContainer>
  ),
  (
    <LinkContainer exact key="sign-in" to="/sign-in">
      <NavItem>Sign In</NavItem>
    </LinkContainer>
  ),
]);

const Header = ({ isSignedIn, requestSignOut }) => (
  <Navbar fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">SomeSchedul.es</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        {isSignedIn && renderSignedInNavItems(requestSignOut)}
        {!isSignedIn && renderSignedOutNavItems()}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  requestSignOut: PropTypes.func.isRequired,
};

export default Header;
