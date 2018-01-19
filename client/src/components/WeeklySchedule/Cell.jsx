import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { FlexContainer } from 'components/Flex';
import { colors } from 'models/constants';

const Cell = styled(FlexContainer)`
  flex-direction: column;
  padding: 8px;
  flex: 1;

  &:not(:last-child) {
    border-right: 1px solid ${colors.lightGrey()};
  }
`;

Cell.propTypes = {
  ...FlexContainer.propTypes,
  isLeftColumn: PropTypes.bool,
  isHeader: PropTypes.bool,
};

export default Cell;
