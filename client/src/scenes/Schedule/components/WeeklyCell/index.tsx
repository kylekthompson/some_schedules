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

  ${({ isLeftColumn }: IWeeklyCellProps) => isLeftColumn && css`padding-left: 8px;` || ''}
  ${({ isHeader }: IWeeklyCellProps) => {
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

export default WeeklyCell;
