import * as React from 'react';
import { findDOMNode } from 'react-dom';

import styled, { css } from 'styled-components';

import { createShift } from '../../../../services/graphql/mutations/createShift';
import { parseTimesInput } from './helpers';
import { IShiftCreationModalProps, IShiftCreationModalState } from './types';

const BackgroundMuter = styled.div`
  background-color: rgba(0, 0, 0, .2);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2000;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, .1);
  left: ${({ x }: { x: number, y: number }) => x - 20}px;
  padding: 10px;
  position: absolute;
  top: ${({ y }: { x: number, y: number }) => y + 10}px;
  z-index: 2001;

  &:before {
    border-color: transparent transparent white transparent;
    border-style: solid;
    border-width: 10px;
    content: '';
    display: block;
    left: 10px;
    position: absolute;
    top: -20px;
  }
`;

const TimeInput = styled.input`
  border: 1px solid lightgrey;
  border-radius: 4px;
  lineheight: 1;
  padding: 6px;

  &:focus {
    outline: none;
  }
`;

const CreateButton = styled.button`
  background-color: #FD4B00;
  border: 1px solid #FD4B00;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  line-height: 1;
  margin-left: 4px;
  padding: 9px;
  text-decoration: none;

  ${({ disabled }) => disabled && css`
    border-color: lightgrey;
    background-color: lightgrey;
  ` || ''}
`;

class ShiftCreationModal extends React.Component<IShiftCreationModalProps, IShiftCreationModalState> {
  private modal: HTMLElement;

  public componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('touchend', this.handleOutsideClick);
  }

  public componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('touchend', this.handleOutsideClick);
  }

  public constructor(props, context) {
    super(props, context);

    this.state = {
      showParsedTimes: false,
      timesInput: '',
    };
  }

  public render() {
    return (
      <div>
        <Modal ref={this.setModalRef} x={this.props.x} y={this.props.y}>
          <div>
            <span style={{ fontSize: '18px' }}>
              New shift for {this.props.user.firstName} {this.props.user.lastName}
            </span>
            <a
              onClick={this.props.dismissModal}
              style={{ fontSize: '18px', float: 'right', cursor: 'pointer', textDecoration: 'none', color: 'black' }}
            >
              &times;
            </a>
          </div>
          <hr style={{ margin: '10px -10px' }} />
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
