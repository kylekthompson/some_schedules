import Logo from 'components/header/logo';
import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'components/header/styled-components';
import { header } from 'models/constants';

export default function Header({ children, theme }) {
  return (
    <Container>
      <Logo theme={theme} />
      {children}
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf([header.DARK_THEME, header.LIGHT_THEME]),
};

Header.defaultProps = {
  theme: header.LIGHT_THEME,
};
