import styled from 'styled-components';

import { colors } from 'models/constants';
import { fonts } from 'models/styles';

export default styled.p`
  ${fonts.semiBold}
  color: ${colors.darkGrey(0.5)};
  font-size: 12px;
  margin-right: auto;
`;
