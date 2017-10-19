import * as React from 'react';

import { FlexChild } from '../../../../components/Flex';

import { IWeeklyNavigationProps } from './types';

const WeeklyNavigation = (_props: IWeeklyNavigationProps) => (
  <FlexChild
    alignSelf="flex-end"
  >
    <button>&lt;</button> ----- <button>&gt;</button>
  </FlexChild>
);

export default WeeklyNavigation;
