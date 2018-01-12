import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FlexContainer } from 'components/Flex';
import Cell from '../Cell';

const HeaderColumn = ({ previousDay, weekday }) => (
  <Cell
    isHeader
    textAlign="center"
  >
    {weekday} - {previousDay.add(1, 'day').format('MM/DD')}
  </Cell>
);

HeaderColumn.propTypes = {
  previousDay: PropTypes.instanceOf(Moment).isRequired,
  weekday: PropTypes.string.isRequired,
};

const renderWeekdays = (previousDay) => Moment.weekdaysShort().map((weekday) =>
  <HeaderColumn key={weekday} previousDay={previousDay} weekday={weekday} />
);

const HeaderContainer = styled(FlexContainer)`
  border-top: solid #023864 1px;
`;

const Header = ({ startOfWeek }) => {
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

Header.propTypes = {
  startOfWeek: PropTypes.instanceOf(Moment).isRequired,
};

export default Header;
