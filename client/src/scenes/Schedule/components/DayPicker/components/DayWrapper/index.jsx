import styled, { css } from 'styled-components';

import { FlexChild } from '../../../../../../components/Flex';
import { IDayWrapperProps } from './types';

const DayWrapper = styled(FlexChild)`
  background-color: white;
  border-radius: 2px;
  cursor: pointer;
  margin: 1px;
  text-align: center;

  &:hover {
    background-color: #FD4B00;
    color: white;
  }

  ${({ day, selectedDay }: IDayWrapperProps) =>
    day.isSame(selectedDay, 'day')
      && css`background-color: #FD4B00; color: white;`
      || ''
  }
  ${({ currentMonth, day }: IDayWrapperProps) =>
    !currentMonth.isSame(day, 'month')
      && css`color: lightgrey;`
      || ''
  }
`;

export default DayWrapper;
