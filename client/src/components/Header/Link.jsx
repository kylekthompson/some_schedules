import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { fonts, links } from 'models/styles';

const HeaderLink = ({ darkTheme, ...rest }) => (
  <Link {...rest} />
);

export default styled(HeaderLink)`
  ${fonts.regular}
  ${({ darkTheme }) => darkTheme ? links.darkLink : links.lightLink}
  font-size: 14px;

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
