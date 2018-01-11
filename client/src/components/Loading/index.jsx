import React from 'react';

import PropTypes from 'prop-types';

import { FlexContainer } from 'components/Flex';

const Loading = ({ message }) => (
  <FlexContainer alignItems="center" flexDirection="column" justifyContent="center">
    <i className="fal fa-2x fa-spin fa-spinner-third" />
    <p>{message}</p>
  </FlexContainer>
);

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loading;
