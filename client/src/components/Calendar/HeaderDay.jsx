import styled from 'styled-components';

import { colors } from 'models/constants';
import { fonts } from 'models/styles';

export default styled.div`
  ${fonts.semiBold}
  color: ${colors.darkGrey(0.5)};
  flex: 1;
  font-size: 12px;
  text-align: center;
`;
