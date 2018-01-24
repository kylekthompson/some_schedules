import React from 'react';

import PropTypes from 'prop-types';

import Header from 'components/Header';
import { Container, HeaderLinks, Routes } from 'scenes/Overview/components';

const Overview = ({ isSignedIn, requestSignIn, requestSignOut }) => (
  <Container>
    <Header>
      <HeaderLinks isSignedIn={isSignedIn} />
    </Header>
    <Routes
      isSignedIn={isSignedIn}
      requestSignIn={requestSignIn}
      requestSignOut={requestSignOut}
    />
  </Container>
);

Overview.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  requestSignIn: PropTypes.func.isRequired,
  requestSignOut: PropTypes.func.isRequired,
};

export default Overview;
