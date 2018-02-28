import React from 'react';

import PropTypes from 'prop-types';

import { Consumer } from 'components/Authentication';
import Header from 'components/Header';
import { Container, HeaderLinks, Routes } from 'scenes/Overview/components';

export const Overview = ({ isSignedIn }) => (
  <Container>
    <Header>
      <HeaderLinks isSignedIn={isSignedIn} />
    </Header>
    <Routes />
  </Container>
);

Overview.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default (props) => (
  <Consumer
    render={({ isSignedIn }) => (
      <Overview
        isSignedIn={isSignedIn}
        {...props}
      />
    )}
  />
);
