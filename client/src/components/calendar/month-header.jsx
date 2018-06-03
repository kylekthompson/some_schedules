import React from 'react';
import {
  HeaderDay,
  HeaderText,
  Week,
} from 'components/calendar/styled-components';

export default function MonthHeader() {
  return (
    <Week>
      <HeaderDay>
        <HeaderText>S</HeaderText>
      </HeaderDay>
      <HeaderDay>
        <HeaderText>M</HeaderText>
      </HeaderDay>
      <HeaderDay>
        <HeaderText>T</HeaderText>
      </HeaderDay>
      <HeaderDay>
        <HeaderText>W</HeaderText>
      </HeaderDay>
      <HeaderDay>
        <HeaderText>T</HeaderText>
      </HeaderDay>
      <HeaderDay>
        <HeaderText>F</HeaderText>
      </HeaderDay>
      <HeaderDay>
        <HeaderText>S</HeaderText>
      </HeaderDay>
    </Week>
  );
}
