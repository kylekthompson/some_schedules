import styled from 'styled-components';

import { colors } from 'models/constants';
import { links } from 'models/styles';

export default styled.a`
  ${links.darkLink}
  color: ${colors.darkGrey(0.5)};

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
