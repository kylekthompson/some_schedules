import * as React from 'react';

import * as Nav from 'react-bootstrap/lib/Nav';
import * as Navbar from 'react-bootstrap/lib/Navbar';
import * as NavItem from 'react-bootstrap/lib/NavItem';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import { IHeaderProps } from './types';

const renderSignInOrSignOut = (isSignedIn: boolean, requestSignOut: () => void) => {
  if (isSignedIn) {
    return (
      <NavItem onClick={requestSignOut}>Test</NavItem>
    );
  }

  return (
    <LinkContainer exact to="/signIn">
      <NavItem>Sign In</NavItem>
    </LinkContainer>
  );
};

const Header = ({ isSignedIn, requestSignOut }: IHeaderProps) => (
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
        {renderSignInOrSignOut(isSignedIn, requestSignOut)}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
