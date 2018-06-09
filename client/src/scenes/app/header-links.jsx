import PropTypes from 'prop-types';
import React from 'react';
import {
  HeaderLinksContainer,
  HeaderLink,
} from 'components/header/styled-components';
import { header } from 'models/constants';

export default function HeaderLinks({ className, requestSignOut }) {
  return (
    <HeaderLinksContainer>
      <HeaderLink onClick={requestSignOut} theme={header.DARK_THEME} to="/">
        Sign Out
      </HeaderLink>
    </HeaderLinksContainer>
  );
}

HeaderLinks.propTypes = {
  requestSignOut: PropTypes.func.isRequired,
};
