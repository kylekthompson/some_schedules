import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { header } from 'models/constants';
import { fonts, links } from 'models/styles';

const HeaderLink = ({ theme, ...rest }) => <Link {...rest} />;

HeaderLink.propTypes = {
  theme: PropTypes.oneOf([header.DARK_THEME, header.LIGHT_THEME]),
};

HeaderLink.defaultProps = {
  theme: header.LIGHT_THEME,
};

export default styled(HeaderLink)`
  ${fonts.regular} ${({ theme }) => {
    if (theme === header.DARK_THEME) {
      return links.darkLink;
    }

    return links.lightLink;
  }}
  font-size: 14px;

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
