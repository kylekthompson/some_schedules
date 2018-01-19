import React from 'react';

import styled from 'styled-components';

import { fonts } from 'models/styles';
import time from 'models/time';

const WeekdayText = styled.p`
  ${fonts.regular}
  font-size: 12px;
`;

const DateText = styled.p`
  ${fonts.semiBold}
  font-size: 48px;
  line-height: 36px;
`;

const HeaderDay = ({ className, day }) => (
  <div className={className}>
    <WeekdayText>
      {time.formatShortWeekdayOnly(day)}
    </WeekdayText>
    <DateText>
      {day.date()}
    </DateText>
  </div>
);

export default styled(HeaderDay)`
  flex: 1;
  flex-direction: column;
`;
