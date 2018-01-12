import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { propTypes as shiftPropTypes } from 'models/shift';
import { propTypes as userPropTypes } from 'models/user';
import { FlexContainer } from 'components/Flex';
import Header from './components/Header';
import Row from './components/Row';
import Scroller from './components/Scroller';

const shiftsForUser = (shifts, user) => shifts.filter((shift) => shift.user.id === user.id);
const renderUserRow = (
  user,
  shifts,
  onAddShift,
  startOfWeek,
) => (
  <Row
    key={user.id}
    onAddShift={onAddShift}
    startOfWeek={startOfWeek}
    user={user}
    shifts={shiftsForUser(shifts, user)}
  />
);

const WeeklyCalendar = ({ onAddShift, selectedDay, shifts, users }) => {
  const startOfWeek = selectedDay.clone().startOf('week');
  return (
    <FlexContainer flexDirection="column">
      <Header startOfWeek={startOfWeek} />
      <Scroller>
        {users.map((user) => renderUserRow(user, shifts, onAddShift, startOfWeek))}
      </Scroller>
    </FlexContainer>
  );
};

WeeklyCalendar.propTypes = {
  onAddShift: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Moment).isRequired,
  shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
  users: PropTypes.arrayOf(userPropTypes).isRequired,
};

export default WeeklyCalendar;
