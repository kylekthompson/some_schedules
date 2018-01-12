import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { FlexContainer } from 'components/Flex';
import DayPicker from '../../../DayPicker';

const Navigation = ({ onDayClick, selectedDay }) => (
  <FlexContainer
    alignSelf="flex-end"
    flexDirection="row"
  >
    <button onClick={onDayClick(selectedDay.clone().subtract(1, 'week'))}>&lt;</button>
    <DayPicker
      onDayClick={onDayClick}
      selectedDay={selectedDay}
    />
    <button onClick={onDayClick(selectedDay.clone().add(1, 'week'))}>&gt;</button>
  </FlexContainer>
);

Navigation.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Moment).isRequired,
};

export default Navigation;
