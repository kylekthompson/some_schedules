import React from 'react';

import PropTypes from 'prop-types';

import Container from 'components/Header/Container';
import Logo from 'components/Header/Logo';
import { header } from 'models/constants';

const Header = ({ children, theme }) => (
  <Container>
    <Logo theme={theme} />
    {children}
  </Container>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf([header.DARK_THEME, header.LIGHT_THEME]),
};

Header.defaultProps = {
  theme: header.LIGHT_THEME,
};

export default Header;
