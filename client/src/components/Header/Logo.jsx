import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Header/Link';
import { fonts, styles } from 'models/constants';

const Logo = ({ className }) => (
  <Link className={className} to="/">
    SomeSchedul.es
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
};

export default styled(Logo)`
  ${fonts.extraBold}
  ${({ darkTheme }) => darkTheme ? styles.darkLink : styles.lightLink}
  cursor: pointer;
  flex: 0;
  font-size: 22px;
`;
