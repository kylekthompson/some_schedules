import React from 'react';

import PropTypes from 'prop-types';

import Header from 'components/Header';
import { Container, Content, HeaderLinks } from 'components/Overview';

const Overview = ({ isSignedIn }) => (
  <Container>
    <Header>
      <HeaderLinks isSignedIn={isSignedIn} />
    </Header>
    <Content isSignedIn={isSignedIn} />
  </Container>
);

Overview.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default Overview;
