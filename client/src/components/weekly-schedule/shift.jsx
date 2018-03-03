import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import ShiftContainer from 'components/weekly-schedule/shift-container';
import { colors } from 'models/constants';
import { shiftPropTypes } from 'models/shift';
import { format, toDate } from 'models/time';

const ColoredDot = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 10px;
  height: 10px;
  margin-right: 5px;
  width: 10px;
`;

const Icon = ({ className, isPublished }) => {
  const icon = isPublished ? 'fal fa-eye' : 'fal fa-eye-slash';
  return (
    <i className={`${icon} ${className || ''}`} />
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  isPublished: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  isPublished: false,
};

const PublishedIcon = styled(Icon)`
  margin-right: 5px;
`;

const Text = styled.p`
  font-size: 12px;
  margin: 0;
`;

const Shift = ({ shift }) => (
  <ShiftContainer>
    <ColoredDot color={colors.shakespeareBlue()} />
    <PublishedIcon isPublished={shift.isPublished} />
    <Text>
      {format.forSchedule(toDate(shift.startTime))} - {format.forSchedule(toDate(shift.endTime))}
    </Text>
  </ShiftContainer>
);

Shift.propTypes = {
  shift: shiftPropTypes.isRequired,
};

export default Shift;