import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { FlexChild, FlexContainer } from '../Flex';
import { Spinning } from './styledComponents';


const SpinningGlyphicon = Spinning(Glyphicon);

const Loading = ({ message }) => (
  <FlexContainer alignItems="center" flexDirection="column" justifyContent="center">
    <FlexChild>
      <SpinningGlyphicon glyph="refresh" />
    </FlexChild>
    <FlexChild>
      <p>{message}</p>
    </FlexChild>
  </FlexContainer>
);

export default Loading;
