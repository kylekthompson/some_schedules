import React from 'react';

import HeaderDay from 'components/calendar/header-day';
import Week from 'components/calendar/week';

const MonthHeader = () => (
  <Week>
    <HeaderDay>S</HeaderDay>
    <HeaderDay>M</HeaderDay>
    <HeaderDay>T</HeaderDay>
    <HeaderDay>W</HeaderDay>
    <HeaderDay>T</HeaderDay>
    <HeaderDay>F</HeaderDay>
    <HeaderDay>S</HeaderDay>
  </Week>
);

export default MonthHeader;
