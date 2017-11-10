import * as React from 'react';
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
import { IShiftCreationModalProps, IShiftCreationModalState } from './types';

class ShiftCreationModal extends React.Component<IShiftCreationModalProps, IShiftCreationModalState> {
  private modal: HTMLElement;

  public constructor(props, context) {
    super(props, context);

    this.state = {
      showParsedTimes: false,
      timesInput: '',
    };
  }

  public componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('touchend', this.handleOutsideClick);
  }

  public componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('touchend', this.handleOutsideClick);
  }

  public render() {
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

  private handleTimesInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      endTime: undefined,
      startTime: undefined,
      timesInput: event.currentTarget.value,
    });
  }

  private parseTimesInput = () => {
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

  private setModalRef = (ref) => {
    this.modal = ref;
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const isInsideClick = findDOMNode(this.modal).contains(event.target as Element);
    if (!isInsideClick) {
      this.props.dismissModal();
    }
  }

  private handleShiftCreation = () => {
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
