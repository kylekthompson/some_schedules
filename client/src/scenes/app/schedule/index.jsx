import Loading from 'components/loading';
import PropTypes from 'prop-types';
import React, { Component, Fragment, createRef } from 'react';
import Request from 'components/request';
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
  initialState,
} from 'scenes/app/schedule/state';
import { isSameWeek } from 'models/time';

export default class Schedule extends Component {
  static propTypes = {
    getSchedulesContext: PropTypes.func,
  };

  static defaultProps = {
    getSchedulesContext,
  };

  getContext = createRef();
  state = initialState;

  componentDidMount() {
    this.getContext.current.sendRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isSameWeek(prevState.selectedDay, this.state.selectedDay)) {
      this.getContext.current.sendRequest();
    }
  }

  handleAddShift = (shift) => {
    this.setState(handleAddShift(shift));
    this.getContext.current.sendRequest();
  };
  handleCloseShiftCreationModal = () =>
    this.setState(handleCloseShiftCreationModal);
  handleDayClick = (day) => () => this.setState(handleDayClick(day));
  handleOpenShiftCreationModal = (userId, day) => (event) => {
    event.stopPropagation();
    const { clientX, clientY } = event;
    this.setState(handleOpenShiftCreationModal(userId, day, clientX, clientY));
  };

  renderError = (error) => <p>{error}</p>;
  renderLoader = () => <Loading message="Loading..." />;
  renderSchedule = (context) => (
    <Fragment>
      <WeeklySchedule
        onClick={this.handleOpenShiftCreationModal}
        shifts={context.shifts}
        startOfWeek={startOfWeek(this.state.selectedDay)}
        testId="weekly-schedule"
        users={context.users}
      />
      <ShiftCreationModal
        {...this.state.shiftCreationModal}
        dismissModal={this.handleCloseShiftCreationModal}
        onAddShift={this.handleAddShift}
        testId="shift-creation-modal"
        user={context.users.find(
          ({ id }) => id === this.state.shiftCreationModal.userId,
        )}
      />
    </Fragment>
  );

  render() {
    return (
      <Request
        ref={this.getContext}
        request={getSchedulesContext}
        arguments={[
          format.forServer(startOfWeek(this.state.selectedDay)),
          format.forServer(endOfWeek(this.state.selectedDay)),
        ]}
        eager={false}
      >
        {({ data, failed, loading }) => {
          let body = null;

          if (loading) {
            body = this.renderLoader();
          } else if (failed) {
            body = this.renderError(
              data.error || 'Uh oh... Something went wrong.',
            );
          } else if (data) {
            body = this.renderSchedule(data.context);
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
        }}
      </Request>
    );
  }
}
