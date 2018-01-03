import React from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { propTypes as shiftPropTypes } from '../../../../models/shift';
import { propTypes as userPropTypes } from '../../../../models/user';
import { FlexContainer } from '../../../../components/Flex';
import Header from './components/Header';
import Navigation from './components/Navigation';
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

const WeeklyCalendar = ({ onAddShift, onDayPick, selectedDay, shifts, users }) => {
  const startOfWeek = selectedDay.clone().startOf('week');
  return (
    <FlexContainer flexDirection="column">
      <Navigation
        onDayPick={onDayPick}
        selectedDay={selectedDay}
      />
      <Header
        startOfWeek={startOfWeek}
      />
      <Scroller>
        {users.map((user) => renderUserRow(user, shifts, onAddShift, startOfWeek))}
      </Scroller>
    </FlexContainer>
  );
};

WeeklyCalendar.propTypes = {
  onAddShift: PropTypes.func.isRequired,
  onDayPick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
  shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
  users: PropTypes.arrayOf(userPropTypes).isRequired,
};

export default WeeklyCalendar;
