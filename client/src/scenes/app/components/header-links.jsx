import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { HeaderLink } from 'components/header/styled-components';
import { header } from 'models/constants';

const HeaderLinks = ({ className, requestSignOut }) => (
  <div className={className}>
    <HeaderLink onClick={requestSignOut} theme={header.DARK_THEME} to="/">
      Sign Out
    </HeaderLink>
  </div>
);

HeaderLinks.propTypes = {
  className: PropTypes.string,
  requestSignOut: PropTypes.func.isRequired,
};

HeaderLinks.defaultProps = {
  className: '',
};

export default styled(HeaderLinks)`
  margin-left: auto;
  font-size: 14px;
`;
