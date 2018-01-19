import styled from 'styled-components';

import { colors } from 'models/constants';

export default styled.div`
  flex: 1;
  flex-direction: column;
  padding: 10px;

  &:not(:last-child) {
    border-right: 1px solid ${colors.lightGrey()};
  }
`;
