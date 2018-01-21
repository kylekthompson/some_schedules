import styled from 'styled-components';

import { colors } from 'models/constants';

export default styled.div`
  display: flex;
  flex-direction: row;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.lightGrey()};
  }
`;
