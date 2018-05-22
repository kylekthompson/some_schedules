import styled from 'styled-components';

import { colors, layout } from 'models/styles';

export default styled.div`
  border-left: 1px solid ${colors.lightGrey()};
  flex: 1;
  height: calc(100vh - ${layout.headerHeight});
`;
