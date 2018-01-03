import React from 'react';
import PropTypes from 'prop-types';

import { FlexChild, FlexContainer } from '../Flex';

export const propTypes = {
  errors: PropTypes.shape({
    '': PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Failure = ({ errors }) => (
  <FlexContainer alignItems="center" flexDirection="column" justifyContent="center">
    <FlexChild>
      <p>It looks like we ran into some problems... We'll look into it. Sorry about that!</p>
    </FlexChild>
    <FlexChild alignItems="flex-start">
      <p>Details:</p>
      {errors[''].map((error, index) => <p key={index}>{error}</p>)}
    </FlexChild>
  </FlexContainer>
);

Failure.propTypes = propTypes;

export default Failure;
