import { css } from 'styled-components';

import fonts from 'models/styles/fonts';

const shared = css`
  align-items: center;
  border-radius: 13px;
  justify-content: center;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 12px;
  height: 26px;
  margin: 2px;
  width: 26px;

  & * {
    ${fonts.semiBold}
  }
`;

export default {
  shared,
};
