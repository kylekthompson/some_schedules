import styled from 'styled-components';

import { layout } from 'models/constants';

export default styled.div`
  flex: 1;
  height: calc(100vh - ${layout.headerHeight});
`;
