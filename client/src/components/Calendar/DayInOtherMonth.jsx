import styled from 'styled-components';

import { colors } from 'models/constants';
import { day } from 'models/styles';

export default styled.div`
  ${day.shared}
  color: ${colors.darkGrey(0.5)};

  &:hover {
    background-color: ${colors.lightGrey()};
  }
`;
