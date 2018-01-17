import React, { Component, Fragment } from 'react';

import Loading from 'components/Loading';
import ScheduleComponent from 'components/Schedule';
import ScheduleSidebar from 'components/ScheduleSidebar';
import ShiftCreationModal from 'components/ShiftCreationModal';
import { Container, ContentContainer, SidebarContainer } from 'scenes/Schedule/components';

import { findUser, get } from 'models/viewer';
import {
  handleAddShift,
  handleCloseShiftCreationModal,
  handleDayClick,
  handleOpenShiftCreationModal,
  handleViewerLoaded,
  handleViewerLoading,
  initialState,
} from 'state/schedule';

class Schedule extends Component {
  state = initialState;

  componentDidMount() {
    this.loadViewer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedDay !== this.state.selectedDay) {
      this.loadViewer();
    }
  }

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
          />
        </SidebarContainer>
        <ContentContainer>
          {body}
        </ContentContainer>
      </Container>
    );
  }

  renderErrors = () => <p>It looks like we ran into a problem! We'll look into that.</p>
  renderLoader = () => <Loading message="Loading..." />
  renderSchedule = () => (
    <Fragment>
      <ScheduleComponent
        onAddShift={this.handleOpenShiftCreationModal}
        selectedDay={this.state.selectedDay}
        viewer={this.state.viewer.data}
      />
      <ShiftCreationModal
        {...this.state.shiftCreationModal}
        dismissModal={this.handleCloseShiftCreationModal}
        onAddShift={this.handleAddShift}
        user={findUser(this.state.viewer.data, this.state.shiftCreationModal.userId)}
      />
    </Fragment>
  )

  handleAddShift = (shift) => this.setState(handleAddShift(shift))
  handleCloseShiftCreationModal = () => this.setState(handleCloseShiftCreationModal)
  handleDayClick = (day) => () => this.setState(handleDayClick(day))
  handleOpenShiftCreationModal = (userId, day) => (event) => {
    event.stopPropagation();
    const { clientX, clientY } = event;
    this.setState(handleOpenShiftCreationModal(userId, day, clientX, clientY));
  }

  loadViewer = async () => {
    const after = this.state.selectedDay.clone().startOf('week').format();
    const before = this.state.selectedDay.clone().endOf('week').format();

    this.setState(handleViewerLoading);

    const viewer = await get({
      after,
      before,
    });

    this.setState(handleViewerLoaded(viewer));
  }
}

export default Schedule;
