import Header from 'components/header';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, HeaderLinks, Routes } from 'scenes/overview/components';
import { authenticated } from 'components/authentication';

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

export default authenticated(Overview);
