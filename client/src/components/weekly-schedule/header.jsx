import HeaderDay from 'components/weekly-schedule/header-day';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  EmptyHeaderCell,
  HeaderCell,
  HeaderContainer,
} from 'components/weekly-schedule/styled-components';
import { addDays, constants, getDate, getMonth } from 'models/time';
import { ofSize } from 'models/array';

export default class Header extends Component {
  static propTypes = {
    startOfWeek: PropTypes.instanceOf(Date).isRequired,
  };

  renderHeaderDays = () =>
    ofSize(constants.DAYS_IN_WEEK)
      .map((day) => addDays(this.props.startOfWeek, day))
      .map((day) => (
        <HeaderCell key={`day-${getMonth(day)}-${getDate(day)}`}>
          <HeaderDay day={day} />
        </HeaderCell>
      ));

  render() {
    return (
      <HeaderContainer>
        <EmptyHeaderCell />
        {this.renderHeaderDays()}
      </HeaderContainer>
    );
  }
}
