import styled from 'styled-components';

import { colors } from 'models/constants';
import { fonts } from 'models/styles';

export default styled.p`
  ${fonts.light}
  color: ${colors.white()};
  font-size: 40px;
  margin-bottom: 10px;
`;
