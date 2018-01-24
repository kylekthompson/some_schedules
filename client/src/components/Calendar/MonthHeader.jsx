import React from 'react';

import HeaderDay from 'components/Calendar/HeaderDay';
import Week from 'components/Calendar/Week';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MonthHeader = () => (
  <Week>
    {DAYS.map((day, index) => <HeaderDay key={index}>{day}</HeaderDay>)}
  </Week>
);

export default MonthHeader;
