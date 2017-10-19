import * as React from 'react';

import * as moment from 'moment-timezone';
import styled from 'styled-components';

import { FlexContainer } from '../../../../../../components/Flex';
import Cell from '../Cell';
import { IHeaderProps } from './types';

const HeaderColumn = ({ previousDay, weekday }: { previousDay: moment.Moment, weekday: string }) => (
  <Cell
    isHeader
    textAlign="center"
  >
    {weekday} - {previousDay.add(1, 'day').format('MM/DD')}
  </Cell>
);

const renderWeekdays = (previousDay: moment.Moment) => moment.weekdaysShort().map((weekday) =>
  <HeaderColumn key={weekday} previousDay={previousDay} weekday={weekday} />
);

const HeaderContainer = styled(FlexContainer)`
  border-top: solid #023864 1px;
`;

const Header = ({ startOfWeek }: IHeaderProps) => {
  const previousDay = startOfWeek.clone().subtract(1, 'day');

  return (
    <HeaderContainer flexDirection="row" style={{ borderTop: 'solid darkgrey 1px' }}>
      <Cell
        flex="0"
        isHeader
        isLeftColumn
        maxWidth="150px"
        minWidth="150px"
      >
        Employees
      </Cell>
      {renderWeekdays(previousDay)}
    </HeaderContainer>
  );
};

export default Header;
