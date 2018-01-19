import React from 'react';

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { propTypes as shiftPropTypes } from 'models/shift';
import { FlexChild } from 'components/Flex';
import { colors } from 'models/constants';
import time from 'models/time';

const { formatForSchedule, toMoment } = time;

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

const PublishedIcon = styled(Icon)`
  margin-right: 5px;
`;

const Text = styled.p`
  font-size: 12px;
  margin: 0;
`;

export const ShiftWrapper = styled(FlexChild)`
  align-items: center;
  border-radius: 2px;
  display: flex;
  flex: none;
  flex-direction: row;
  margin-bottom: 5px;

  :last-child {
    margin-bottom: 0;
  }
`;

const Shift = ({ shift }) => (
  <ShiftWrapper>
    <ColoredDot color={colors.shakespeareBlue()} />
    <PublishedIcon isPublished={shift.isPublished} />
    <Text>
      {formatForSchedule(toMoment(shift.startTime))} - {formatForSchedule(toMoment(shift.endTime))}
    </Text>
  </ShiftWrapper>
);

Shift.propTypes = {
  shift: shiftPropTypes.isRequired,
};

export default Shift;
