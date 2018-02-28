import styled from 'styled-components';

import { colors } from 'models/constants';

const Cell = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px;

  &:not(:last-child) {
    border-right: 1px solid ${colors.lightGrey()};
  }
`;

export default Cell;
