import Loading from 'components/loading';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ScheduleSidebar from 'components/schedule-sidebar';
import ShiftCreationModal from 'components/shift-creation-modal';
import WeeklySchedule from 'components/weekly-schedule';
import {
  Container,
  ContentContainer,
  SidebarContainer,
} from 'scenes/app/schedule/styled-components';
import { endOfWeek, format, startOfWeek } from 'models/time';
import { getContext as getSchedulesContext } from 'apis/schedules';
import {
  handleAddShift,
  handleCloseShiftCreationModal,
  handleDayClick,
  handleOpenShiftCreationModal,
  handleContextLoaded,
  handleContextLoading,
  initialState,
} from 'scenes/app/schedule/state';

export default class Schedule extends Component {
  static propTypes = {
    getSchedulesContext: PropTypes.func,
    setHeaderLinks: PropTypes.func.isRequired,
  };

  static defaultProps = {
    getSchedulesContext,
  };

  state = initialState;

  componentDidMount() {
    this.loadViewer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedDay !== this.state.selectedDay) {
      this.loadViewer();
    }
  }

  handleAddShift = (shift) => this.setState(handleAddShift(shift));
  handleCloseShiftCreationModal = () =>
    this.setState(handleCloseShiftCreationModal);
  handleDayClick = (day) => () => this.setState(handleDayClick(day));
  handleOpenShiftCreationModal = (userId, day) => (event) => {
    event.stopPropagation();
    const { clientX, clientY } = event;
    this.setState(handleOpenShiftCreationModal(userId, day, clientX, clientY));
  };

  loadViewer = async () => {
    const after = format.forServer(startOfWeek(this.state.selectedDay));
    const before = format.forServer(endOfWeek(this.state.selectedDay));

    this.setState(handleContextLoading);

    const { context, error } = await this.props.getSchedulesContext(
      after,
      before,
    );

    this.setState(handleContextLoaded(context, error));
  };

  renderError = () => <p>{this.state.context.error}</p>;
  renderLoader = () => <Loading message="Loading..." />;
  renderSchedule = () => (
    <Fragment>
      <WeeklySchedule
        onClick={this.handleOpenShiftCreationModal}
        shifts={this.state.context.shifts}
        startOfWeek={startOfWeek(this.state.selectedDay)}
        testId="weekly-schedule"
        users={this.state.context.users}
      />
      <ShiftCreationModal
        {...this.state.shiftCreationModal}
        dismissModal={this.handleCloseShiftCreationModal}
        onAddShift={this.handleAddShift}
        testId="shift-creation-modal"
        user={this.state.context.users.find(
          ({ id }) => id === this.state.shiftCreationModal.userId,
        )}
      />
    </Fragment>
  );

  render() {
    const { error, isLoaded } = this.state.context;
    let body = null;

    if (!isLoaded) {
      body = this.renderLoader();
    } else if (error) {
      body = this.renderError();
    } else {
      body = this.renderSchedule();
    }

    return (
      <Container>
        <SidebarContainer>
          <ScheduleSidebar
            onDayClick={this.handleDayClick}
            selectedDay={this.state.selectedDay}
            testId="schedule-sidebar"
          />
        </SidebarContainer>
        <ContentContainer>{body}</ContentContainer>
      </Container>
    );
  }
}
