import React from 'react';

import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { FlexChild, FlexContainer } from 'components/Flex';
import { Spinning } from 'components/Loading/styledComponents';

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

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loading;
