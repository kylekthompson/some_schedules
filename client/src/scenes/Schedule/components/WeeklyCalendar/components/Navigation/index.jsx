import React from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import { FlexContainer } from '../../../../../../components/Flex';
import DayPicker from '../../../DayPicker';

const Navigation = ({ onDayPick, selectedDay }) => (
  <FlexContainer
    alignSelf="flex-end"
    flexDirection="row"
  >
    <button onClick={onDayPick(selectedDay.clone().subtract(1, 'week'))}>&lt;</button>
    <DayPicker
      onDayPick={onDayPick}
      selectedDay={selectedDay}
    />
    <button onClick={onDayPick(selectedDay.clone().add(1, 'week'))}>&gt;</button>
  </FlexContainer>
);

Navigation.propTypes = {
  onDayPick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
};

export default Navigation;
