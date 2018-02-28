import React from 'react';

import PropTypes from 'prop-types';

import Container from 'components/loading/container';

const Loading = ({ message }) => (
  <Container>
    <i className="fal fa-2x fa-spin fa-spinner-third" />
    <p>{message}</p>
  </Container>
);

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loading;
