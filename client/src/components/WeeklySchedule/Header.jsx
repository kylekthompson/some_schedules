import React, { Component } from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EmptyHeaderCell from 'components/WeeklySchedule/EmptyHeaderCell';
import HeaderCell from 'components/WeeklySchedule/HeaderCell';
import HeaderDay from 'components/WeeklySchedule/HeaderDay';
import array from 'models/array';
import { colors } from 'models/constants';
import { constants } from 'models/time';

class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    startOfWeek: PropTypes.instanceOf(Moment).isRequired,
  };

  render() {
    return (
      <div className={this.props.className}>
        <EmptyHeaderCell />
        {this.renderHeaderDays()}
      </div>
    );
  }

  renderHeaderDays = () => {
    const dayBeforeStartOfWeek = this.props.startOfWeek.clone().subtract(1, 'day');
    return array.ofSize(constants.DAYS_IN_WEEK).map((index) => (
      <HeaderCell key={index}>
        <HeaderDay day={dayBeforeStartOfWeek.add(1, 'day').clone()} />
      </HeaderCell>
    ));
  }
}

export default styled(Header)`
  border-bottom: 1px solid ${colors.lightGrey()};
  display: flex;
  flex: none;
  flex-direction: row;
`;