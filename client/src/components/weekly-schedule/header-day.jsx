import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fonts } from 'models/styles';
import { format } from 'models/time';

const WeekdayText = styled.p`
  ${fonts.regular} font-size: 12px;
`;

const DateText = styled.p`
  ${fonts.semiBold} font-size: 48px;
  line-height: 36px;
`;

const HeaderDay = ({ className, day }) => (
  <div className={className}>
    <WeekdayText>{format.shortWeekdayOnly(day)}</WeekdayText>
    <DateText>{format.dateOnly(day)}</DateText>
  </div>
);

HeaderDay.propTypes = {
  className: PropTypes.string,
  day: PropTypes.instanceOf(Date).isRequired,
};

HeaderDay.defaultProps = {
  className: '',
};

export default styled(HeaderDay)`
  flex: 1;
  flex-direction: column;
`;
