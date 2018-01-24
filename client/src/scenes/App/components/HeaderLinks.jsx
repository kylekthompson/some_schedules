import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Header/Link';

const HeaderLinks = ({ className, requestSignOut }) => (
  <div className={className}>
    <Link
      darkTheme
      onClick={requestSignOut}
      to="/"
    >
      Sign Out
    </Link>
  </div>
);

HeaderLinks.propTypes = {
  className: PropTypes.string,
  requestSignOut: PropTypes.func.isRequired,
};

export default styled(HeaderLinks)`
  margin-left: auto;
  font-size: 14px;
`;
