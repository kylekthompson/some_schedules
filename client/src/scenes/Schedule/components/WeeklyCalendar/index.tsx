import * as React from 'react';

import { IWeeklyCalendarProps } from './types';

// const formatTime = (time) => moment(time, 'YYYY-MM-DD HH-mm-ss UTC').format('MMMM Do, YYYY h:mm:ss a');

const WeeklyCalendar = (props: IWeeklyCalendarProps) => (
  <p>Cal: {props.initialWeekNumber}</p>
);

export default WeeklyCalendar;
