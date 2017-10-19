import * as React from 'react';

import * as moment from 'moment-timezone';

import { FlexContainer } from '../../../../components/Flex';
import WeeklyCell from '../WeeklyCell';
import { IWeeklyHeaderProps } from './types';

const HeaderColumn = ({ previousDay, weekday }: { previousDay: moment.Moment, weekday: string }) => (
  <WeeklyCell
    flex="1"
    isHeader
    textAlign="center"
  >
    {weekday} - {previousDay.add(1, 'day').format('MM/DD')}
  </WeeklyCell>
);

const WeeklyHeader = ({ startOfWeek }: IWeeklyHeaderProps) => {
  const clonedStartOfWeek = startOfWeek.clone().subtract(1, 'day');

  return (
    <FlexContainer flexDirection="row" style={{ borderTop: 'solid darkgrey 1px' }}>
      <WeeklyCell
        flex="0"
        isHeader
        isLeftColumn
        maxWidth="150px"
        minWidth="150px"
      >
        Employees
      </WeeklyCell>
      {moment.weekdaysShort().map((weekday) => <HeaderColumn key={weekday} previousDay={clonedStartOfWeek} weekday={weekday} />)}
    </FlexContainer>
  );
};

export default WeeklyHeader;
