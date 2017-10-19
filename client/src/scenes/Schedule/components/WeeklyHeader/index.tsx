import * as React from 'react';

import * as moment from 'moment-timezone';
import styled from 'styled-components';

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

const renderWeekdays = (previousDay: moment.Moment) => moment.weekdaysShort().map((weekday) =>
  <HeaderColumn key={weekday} previousDay={previousDay} weekday={weekday} />
);

const HeaderContainer = styled(FlexContainer)`
  border-top: solid #023864 1px;
`;

const WeeklyHeader = ({ startOfWeek }: IWeeklyHeaderProps) => {
  const previousDay = startOfWeek.clone().subtract(1, 'day');

  return (
    <HeaderContainer flexDirection="row" style={{ borderTop: 'solid darkgrey 1px' }}>
      <WeeklyCell
        flex="0"
        isHeader
        isLeftColumn
        maxWidth="150px"
        minWidth="150px"
      >
        Employees
      </WeeklyCell>
      {renderWeekdays(previousDay)}
    </HeaderContainer>
  );
};

export default WeeklyHeader;
