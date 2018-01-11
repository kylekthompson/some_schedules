import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { FlexChild } from 'components/Flex';

const DayContainer = styled(FlexChild)`
  background-color: white;
  cursor: pointer;
  margin: 1px;
  padding: 5px;
  text-align: center;

  &:hover {
    background-color: #FD4B00;
    color: white;
  }

  ${({ day, selectedDay }) =>
    day.isSame(selectedDay, 'day')
      ? css`background-color: #FD4B00; color: white;`
      : ''
  }
  ${({ currentMonth, day }) =>
    !currentMonth.isSame(day, 'month')
      ? css`color: lightgrey;`
      : ''
  }
`;

DayContainer.propTypes = {
  ...FlexChild.propTypes,
  currentMonth: PropTypes.instanceOf(moment).isRequired,
  day: PropTypes.instanceOf(moment).isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
}

export default DayContainer;
