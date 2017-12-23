import React from 'react';
import { findDOMNode } from 'react-dom';

import { createShift } from '../../../../services/graphql/mutations/createShift';
import BackgroundMuter from './components/BackgroundMuter';
import CreateButton from './components/CreateButton';
import DismissButton from './components/DismissButton';
import FontSizeAdjuster from './components/FontSizeAdjuster';
import Modal from './components/Modal';
import Separator from './components/Separator';
import TimeInput from './components/TimeInput';
import { parseTimesInput } from './helpers';

class ShiftCreationModal extends React.Component {
  modal = null;

  constructor(props, context) {
    super(props, context);

    this.state = {
      showParsedTimes: false,
      timesInput: '',
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('touchend', this.handleOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('touchend', this.handleOutsideClick);
  }

  render() {
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
    const [startTime, endTime] = parseTimesInput(this.props.day, this.state.timesInput);

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
    const isInsideClick = findDOMNode(this.modal).contains(event.target);
    if (!isInsideClick) {
      this.props.dismissModal();
    }
  }

  handleShiftCreation = () => {
    if (this.state.startTime && this.state.endTime) {
      createShift({
        endTime: this.state.endTime.format(),
        startTime: this.state.startTime.format(),
        userId: this.props.user.id,
      }).then(({ data: { createShift: { shift } } }) => {
        if (shift) {
          this.props.onAddShift(shift);
          this.props.dismissModal();
        }
      });
    }
  }
}

export default ShiftCreationModal;
