import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { fonts, links } from 'models/styles';

const HeaderLink = ({ darkTheme, ...rest }) => (
  <Link {...rest} />
);

HeaderLink.propTypes = {
  darkTheme: PropTypes.bool,
};

export default styled(HeaderLink)`
  ${fonts.regular}
  ${({ darkTheme }) => darkTheme ? links.darkLink : links.lightLink}
  font-size: 14px;

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
