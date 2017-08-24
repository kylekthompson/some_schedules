import * as React from 'react';

import * as Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { FlexChild, FlexContainer } from '../Flex';
import { Spinning } from './styledComponents';
import { ILoadingProps } from './types';

const SpinningGlyphicon = Spinning(Glyphicon) as Glyphicon;

const Loading = ({ message }: ILoadingProps) => (
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
