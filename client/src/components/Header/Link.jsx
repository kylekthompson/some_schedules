import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { fonts, styles } from 'models/constants';

const HeaderLink = ({ darkTheme, ...rest }) => (
  <Link {...rest} />
);

export default styled(HeaderLink)`
  ${fonts.regular}
  ${({ darkTheme }) => darkTheme ? styles.darkLink : styles.lightLink}
  font-size: 14px;

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
