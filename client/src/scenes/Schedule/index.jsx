import React, { Component } from 'react';

import moment from 'moment-timezone';

import Loading from 'components/Loading';
import {
  Container,
  Schedule as ScheduleComponent,
  ScheduleContainer,
  Sidebar,
} from 'components/Schedule';

import { addShiftToState, getViewer } from './helpers';

class Schedule extends Component {
  state = {
    errors: null,
    isLoaded: false,
    selectedDay: moment.tz(moment.tz.guess()),
    viewer: null,
  };

  componentDidMount() {
    this.loadViewer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedDay !== this.state.selectedDay) {
      this.loadViewer();
    }
  }

  render() {
    const { errors, isLoaded } = this.state;
    let body = null;

    if (!isLoaded) {
      body = this.renderLoader();
    } else if (errors) {
      body = this.renderErrors();
    } else {
      body = this.renderSchedule();
    }

    return (
      <Container>
        <Sidebar
          onDayPick={this.setSelectedDay}
          selectedDay={this.state.selectedDay}
        />
        <ScheduleContainer>
          {body}
        </ScheduleContainer>
      </Container>
    );
  }

  renderErrors = () => (
    <p>
      It looks like we ran into a problem! We'll look into that.
    </p>
  )

  renderLoader = () => (
    <Loading message="Loading..." />
  )

  renderSchedule = () => (
    <ScheduleComponent
      onAddShift={this.handleAddShift}
      selectedDay={this.state.selectedDay}
      viewer={this.state.viewer}
    />
  )

  setSelectedDay = (day) => () => {
    this.setState({
      selectedDay: day,
    });
  }

  handleAddShift = (shift) => {
    this.setState((prevState) => addShiftToState(prevState, shift));
  }

  loadViewer = () => {
    const after = this.state.selectedDay.clone().startOf('week').format();
    const before = this.state.selectedDay.clone().endOf('week').format();

    this.setState({
      isLoaded: false,
    });

    getViewer(after, before).then(({ data: { viewer }, errors }) => {
      if (viewer) {
        this.setState({
          viewer,
          isLoaded: true,
        });
      } else {
        this.setState({
          errors,
          isLoaded: true,
        });
      }
    }).catch((_error) => {
      // TODO: handle error
    });
  }
}

export default Schedule;
