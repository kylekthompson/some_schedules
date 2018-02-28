import styled from 'styled-components';

import { colors } from 'models/constants';

const TimeInput = styled.input`
  border: 1px solid ${colors.lightGrey()};
  border-radius: 4px;
  line-height: 1;
  padding: 6px;

  &:focus {
    outline: none;
  }
`;

export default TimeInput;
