import styled, { css } from 'styled-components';

import { FlexContainer } from '../../../../../../components/Flex';

const Cell = styled(FlexContainer)`
  flex-direction: column;
  border-bottom: solid lightgrey 1px;
  border-right: solid lightgrey 1px;
  padding: 4px;
  flex: 1;

  :first-child {
    border-left: solid lightgrey 1px;
  }

  ${({ isLeftColumn }) => isLeftColumn ? css`padding-left: 8px;` : ''}
  ${({ isHeader }) => {
    if (isHeader) {
      return css`
        background-color: #045BA3;
        border-bottom: solid #023864 1px;
        border-right: solid #023864 1px;
        color: white;

        :first-child {
          border-left: solid #023864 1px;
        }
      `;
    } else {
      return '';
    }
  }}
`;

export default Cell;
