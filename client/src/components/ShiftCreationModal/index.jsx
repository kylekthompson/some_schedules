import React from 'react';
import { findDOMNode } from 'react-dom';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import BackgroundMuter from 'components/ShiftCreationModal/BackgroundMuter';
import CreateButton from 'components/ShiftCreationModal/CreateButton';
import DismissButton from 'components/ShiftCreationModal/DismissButton';
import FontSizeAdjuster from 'components/ShiftCreationModal/FontSizeAdjuster';
import Modal from 'components/ShiftCreationModal/Modal';
import Separator from 'components/ShiftCreationModal/Separator';
import TimeInput from 'components/ShiftCreationModal/TimeInput';
import { userPropTypes } from 'models/user';
import { format, parseInput } from 'models/time';
import { createShift } from 'services/graphql/mutations/createShift';

class ShiftCreationModal extends React.Component {
  static propTypes = {
    createShift: PropTypes.func.isRequired,
    day: PropTypes.instanceOf(Moment),
    dismissModal: PropTypes.func.isRequired,
    onAddShift: PropTypes.func.isRequired,
    user: userPropTypes,
    visible: PropTypes.bool.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    createShift,
  };

  modal = null;
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

  render() {
    if (!this.props.visible) { return null; }

    return (
      <div>
        <Modal ref={this.setModalRef} x={this.props.x} y={this.props.y}>
          <div>
            <FontSizeAdjuster fontSize={18}>
              New shift for {this.props.user.firstName} {this.props.user.lastName}
            </FontSizeAdjuster>
            <DismissButton onClick={this.props.dismissModal} />
          </div>
          <Separator />
          <span>
            {this.props.day.format('ddd, MMM Do')} from&nbsp;
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

  handleTimesInputChange = (event) => {
    this.setState({
      endTime: undefined,
      startTime: undefined,
      timesInput: event.currentTarget.value,
    });
  }

  parseTimesInput = () => {
    const [startTime, endTime] = parseInput(this.props.day, this.state.timesInput);

    if (startTime && endTime) {
      this.setState({
        endTime,
        startTime,
        timesInput: `${startTime.format('h:mm a')} - ${endTime.format('h:mm a')}`,
      });
    } else {
      this.setState({
        timesInput: '',
      });
    }
  }

  setModalRef = (ref) => {
    this.modal = ref;
  }

  handleOutsideClick = (event) => {
    if (!this.modal) { return; }

    const isInsideClick = findDOMNode(this.modal).contains(event.target);
    if (!isInsideClick) {
      this.props.dismissModal();
    }
  }

  handleShiftCreation = () => {
    if (this.state.startTime && this.state.endTime) {
      this.props.createShift({
        endTime: format.forServer(this.state.endTime),
        startTime: format.forServer(this.state.startTime),
        userId: this.props.user.id,
      }).then(({ data: { createShift: { shift } } }) => {
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
  }
}

export default ShiftCreationModal;
