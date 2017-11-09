import * as React from 'react';

import styled from 'styled-components';

import { parseTimesInput } from './helpers';
import { IShiftCreationModalProps, IShiftCreationModalState } from './types';

const ModalContainer = styled.div`
  z-index: 2001;
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundMuter = styled.div`
  z-index: 2000;
  position: absolute;
  background-color: rgba(0, 0, 0, .5);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
`;

class ShiftCreationModal extends React.Component<IShiftCreationModalProps, IShiftCreationModalState> {
  public constructor(props, context) {
    super(props, context);

    this.state = {
      endTime: this.props.day.clone(),
      showParsedTimes: false,
      startTime: this.props.day.clone(),
      timesInput: '',
    };
  }

  public render() {
    return (
      <div>
        <ModalContainer>
          <Modal>
            <a onClick={this.props.dismissModal}>&times;</a>
            <span>Shift Time</span>
            <input
              type="text"
              onChange={this.handleTimesInputChange}
              onBlur={this.parseTimesInput}
              value={this.state.timesInput}
            />
          </Modal>
        </ModalContainer>
        <BackgroundMuter />
      </div>
    );
  }

  private handleTimesInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
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
        timesInput: 'Try this: 9:30a - 5p',
      });
    }
  }
}

export default ShiftCreationModal;
