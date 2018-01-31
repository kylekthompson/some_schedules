import React from 'react';

import PropTypes from 'prop-types';

import Container from 'components/Header/Container';
import Logo from 'components/Header/Logo';

const Header = ({ children, darkTheme }) => (
  <Container>
    <Logo darkTheme={darkTheme} />
    {children}
  </Container>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
  darkTheme: PropTypes.bool,
};

Header.defaultProps = {
  darkTheme: false,
};

export default Header;
