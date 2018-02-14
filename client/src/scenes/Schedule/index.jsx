import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import Loading from 'components/Loading';
import WeeklySchedule from 'components/WeeklySchedule';
import ScheduleSidebar from 'components/ScheduleSidebar';
import ShiftCreationModal from 'components/ShiftCreationModal';
import { endOfWeek, format, startOfWeek } from 'models/time';
import { findUser, get } from 'models/viewer';
import { Container, ContentContainer, SidebarContainer } from 'scenes/Schedule/components';
import {
  handleAddShift,
  handleCloseShiftCreationModal,
  handleDayClick,
  handleOpenShiftCreationModal,
  handleViewerLoaded,
  handleViewerLoading,
  initialState,
} from 'scenes/Schedule/state';

class Schedule extends Component {
  static propTypes = {
    getViewer: PropTypes.func,
    setHeaderLinks: PropTypes.func.isRequired,
  };

  static defaultProps = {
    getViewer: get,
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

  handleAddShift = (shift) => this.setState(handleAddShift(shift))
  handleCloseShiftCreationModal = () => this.setState(handleCloseShiftCreationModal)
  handleDayClick = (day) => () => this.setState(handleDayClick(day))
  handleOpenShiftCreationModal = (userId, day) => (event) => {
    event.stopPropagation();
    const { clientX, clientY } = event;
    this.setState(handleOpenShiftCreationModal(userId, day, clientX, clientY));
  }

  loadViewer = async () => {
    const after = format.forServer(startOfWeek(this.state.selectedDay));
    const before = format.forServer(endOfWeek(this.state.selectedDay));

    this.setState(handleViewerLoading);

    const viewer = await this.props.getViewer({
      after,
      before,
    });

    this.setState(handleViewerLoaded(viewer));
  }

  renderErrors = () => <p>{'It looks like we ran into a problem! We\'ll look into that.'}</p>
  renderLoader = () => <Loading message="Loading..." />
  renderSchedule = () => (
    <Fragment>
      <WeeklySchedule
        onClick={this.handleOpenShiftCreationModal}
        shifts={this.state.viewer.data.company.shifts}
        startOfWeek={startOfWeek(this.state.selectedDay)}
        testId="weekly-schedule"
        users={this.state.viewer.data.company.users}
      />
      <ShiftCreationModal
        {...this.state.shiftCreationModal}
        dismissModal={this.handleCloseShiftCreationModal}
        onAddShift={this.handleAddShift}
        testId="shift-creation-modal"
        user={findUser(this.state.viewer.data, this.state.shiftCreationModal.userId)}
      />
    </Fragment>
  )

  render() {
    const { errors, isLoaded } = this.state.viewer;
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
        <SidebarContainer>
          <ScheduleSidebar
            onDayClick={this.handleDayClick}
            selectedDay={this.state.selectedDay}
            testId="schedule-sidebar"
          />
        </SidebarContainer>
        <ContentContainer>
          {body}
        </ContentContainer>
      </Container>
    );
  }
}

export default Schedule;
