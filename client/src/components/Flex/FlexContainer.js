import styled from 'styled-components';

import FlexChild, { propTypes } from 'components/Flex/FlexChild';

const FlexContainer = styled(FlexChild)`
  display: flex;
`;

FlexContainer.propTypes = propTypes;

export default FlexContainer;
