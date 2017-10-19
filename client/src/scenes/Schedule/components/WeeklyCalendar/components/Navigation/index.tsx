import * as React from 'react';

import { FlexChild } from '../../../../../../components/Flex';

import { INavigationProps } from './types';

const Navigation = (_props: INavigationProps) => (
  <FlexChild
    alignSelf="flex-end"
  >
    <button>&lt;</button> ----- <button>&gt;</button>
  </FlexChild>
);

export default Navigation;
