import styled from 'styled-components';

import { colors } from 'models/constants';
import { day } from 'models/styles';

export default styled.div`
  ${day.shared}
  background-color: ${colors.shakespeareBlue()};
  color: ${colors.catskillWhite()};

  &:hover {
    background-color: ${colors.shakespeareBlue()};
  }
`;
