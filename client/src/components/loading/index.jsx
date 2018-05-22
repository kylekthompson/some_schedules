import PropTypes from 'prop-types';
import React from 'react';
import { Container, Message } from 'components/loading/styled-components';

export default function Loading({ message }) {
  return (
    <Container>
      <i className="fal fa-2x fa-spin fa-spinner-third" />
      <Message>{message}</Message>
    </Container>
  );
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};
