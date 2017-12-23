import React from 'react';

import { FlexChild, FlexContainer } from '../Flex';

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

export default Failure;
