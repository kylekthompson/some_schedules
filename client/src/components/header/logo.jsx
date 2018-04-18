import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/header/link';
import { header } from 'models/constants';
import { fonts, links } from 'models/styles';

const Logo = ({ className }) => (
  <Link className={className} href="/" to="/">
    SomeSchedul.es
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
};

export default styled(Logo)`
  ${fonts.extraBold} ${({ theme }) => {
    if (theme === header.DARK_THEME) {
      return links.darkLink;
    }

    return links.lightLink;
  }}
  flex: 0;
  font-size: 22px;
`;
