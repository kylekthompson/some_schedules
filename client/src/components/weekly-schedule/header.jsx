import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import EmptyHeaderCell from 'components/WeeklySchedule/EmptyHeaderCell';
import HeaderCell from 'components/WeeklySchedule/HeaderCell';
import HeaderDay from 'components/WeeklySchedule/HeaderDay';
import { ofSize } from 'models/array';
import { colors } from 'models/constants';
import { addDays, constants, getDate, getMonth } from 'models/time';

class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    startOfWeek: PropTypes.instanceOf(Date).isRequired,
  };

  static defaultProps = {
    className: '',
  };

  renderHeaderDays = () => ofSize(constants.DAYS_IN_WEEK)
    .map((day) => addDays(this.props.startOfWeek, day))
    .map((day) => (
      <HeaderCell key={`day-${getMonth(day)}-${getDate(day)}`}>
        <HeaderDay day={day} />
      </HeaderCell>
    ))

  render() {
    return (
      <div className={this.props.className}>
        <EmptyHeaderCell />
        {this.renderHeaderDays()}
      </div>
    );
  }
}

export default styled(Header)`
  border-bottom: 1px solid ${colors.lightGrey()};
  display: flex;
  flex: none;
  flex-direction: row;
`;
