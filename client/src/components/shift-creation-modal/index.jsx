import React from 'react';

import PropTypes from 'prop-types';

import { postCreate as createShift } from 'apis/shifts';
import BackgroundMuter from 'components/shift-creation-modal/background-muter';
import CreateButton from 'components/shift-creation-modal/create-button';
import DismissButton from 'components/shift-creation-modal/dismiss-button';
import FontSizeAdjuster from 'components/shift-creation-modal/font-size-adjuster';
import Modal from 'components/shift-creation-modal/modal';
import Separator from 'components/shift-creation-modal/separator';
import TimeInput from 'components/shift-creation-modal/time-input';
import { userPropTypes } from 'models/user';
import { format, parseInput } from 'models/time';

class ShiftCreationModal extends React.Component {
  static propTypes = {
    createShift: PropTypes.func,
    day: PropTypes.instanceOf(Date),
    dismissModal: PropTypes.func.isRequired,
    onAddShift: PropTypes.func.isRequired,
    user: userPropTypes,
    visible: PropTypes.bool.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    createShift,
    day: null,
    user: null,
    x: null,
    y: null,
  };

  state = {
    timesInput: '',
  };

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('touchend', this.handleOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('touchend', this.handleOutsideClick);
  }

  setModalRef = (ref) => {
    this.modal = ref;
  };

  parseTimesInput = () => {
    const [startTime, endTime] = parseInput(
      this.props.day,
      this.state.timesInput,
    );

    if (startTime && endTime) {
      this.setState({
        endTime,
        startTime,
        timesInput: `${format.forSchedule(startTime)} - ${format.forSchedule(
          endTime,
        )}`,
      });
    } else {
      this.setState({
        timesInput: '',
      });
    }
  };

  handleOutsideClick = (event) => {
    if (!this.modal) {
      return;
    }

    const isInsideClick = this.modal.contains(event.target);
    if (!isInsideClick) {
      this.props.dismissModal();
    }
  };

  handleTimesInputChange = (event) => {
    this.setState({
      endTime: undefined,
      startTime: undefined,
      timesInput: event.currentTarget.value,
    });
  };

  handleShiftCreation = () => {
    if (this.state.startTime && this.state.endTime) {
      this.props
        .createShift(this.props.user, {
          endTime: format.forServer(this.state.endTime),
          startTime: format.forServer(this.state.startTime),
        })
        .then(({ shift }) => {
          if (shift) {
            this.setState({
              endTime: null,
              startTime: null,
              timesInput: '',
            });
            this.props.onAddShift(shift);
            this.props.dismissModal();
          }
        });
    }
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <div>
        <Modal innerRef={this.setModalRef} x={this.props.x} y={this.props.y}>
          <div>
            <FontSizeAdjuster fontSize={18}>
              New shift for {this.props.user.firstName}{' '}
              {this.props.user.lastName}
            </FontSizeAdjuster>
            <DismissButton onClick={this.props.dismissModal} />
          </div>
          <Separator />
          <span>
            {format.forTimeInput(this.props.day)} from&nbsp;
            <TimeInput
              onChange={this.handleTimesInputChange}
              onBlur={this.parseTimesInput}
              placeholder="9:30a - 5p"
              type="text"
              value={this.state.timesInput}
            />
          </span>
          <CreateButton
            disabled={!(this.state.startTime && this.state.endTime)}
            onClick={this.handleShiftCreation}
            onMouseEnter={this.parseTimesInput}
          >
            Create
          </CreateButton>
        </Modal>
        <BackgroundMuter />
      </div>
    );
  }
}

export default ShiftCreationModal;
