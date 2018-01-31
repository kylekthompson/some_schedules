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

HeaderLink.defaultProps = {
  darkTheme: false,
};

export default styled(HeaderLink)`
  ${fonts.regular}
  ${({ darkTheme }) => {
    if (darkTheme) {
      return links.darkLink;
    }

    return links.lightLink;
  }}
  font-size: 14px;

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
