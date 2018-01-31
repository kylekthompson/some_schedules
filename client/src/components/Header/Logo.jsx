import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Header/Link';
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
  ${fonts.extraBold}
  ${({ darkTheme }) => {
    if (darkTheme) {
      return links.darkLink;
    }

    return links.lightLink;
  }}
  flex: 0;
  font-size: 22px;
`;
