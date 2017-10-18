import styled, { css } from 'styled-components';

import { FlexContainer } from '../../../../components/Flex';
import { IWeeklyCellProps } from './types';

const WeeklyCell = styled(FlexContainer)`
  flex-direction: column;
  border-bottom: solid lightgrey 1px;
  border-right: solid lightgrey 1px;
  padding: 4px;

  :first-child {
    border-left: solid lightgrey 1px;
  }

  ${({ isHeader }: IWeeklyCellProps) => {
    if (isHeader) {
      return css`
        background-color: lightgrey;
        border-bottom: solid darkgrey 1px;
        border-right: solid darkgrey 1px;

        :first-child {
          border-left: solid darkgrey 1px;
        }
      `;
    } else {
      return css``;
    }
  }}
`;

export default WeeklyCell;
