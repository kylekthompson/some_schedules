import * as React from 'react';

import styled, { css } from 'styled-components';

import { FlexContainer } from '../../../../../../components/Flex';
import { INavigationProps, INavigationState } from './types';

const DayPickerContainer = styled.div`
  position: relative;
`;

const DayPicker = styled.div`
  background-color: lightgrey;
  height: 200px;
  left: 50%;
  margin-left: -100px;
  position: absolute;
  text-align: center;
  top: 40px;
  width: 200px;

  &:before {
    border-color: transparent transparent lightgrey transparent;
    border-style: solid;
    border-width: 10px;
    content: '';
    display: block;
    left: 50%;
    margin-left: -10px;
    position: absolute;
    top: -20px;
  }

  ${({ visible }: { visible?: boolean}) => !visible && css`display: none` || ''}
`;

class Navigation extends React.Component<INavigationProps, INavigationState> {
  public state: INavigationState = {
    isDayPickerVisible: false,
  };

  public render() {
    const { isDayPickerVisible } = this.state;

    return (
      <FlexContainer
        alignSelf="flex-end"
        flexDirection="row"
      >
        <button>&lt;</button>
        <DayPickerContainer>
          <button onClick={this.toggleVisibility}>CAL</button>
          <DayPicker visible={isDayPickerVisible}>CALENDAR GOES HERE</DayPicker>
        </DayPickerContainer>
        <button>&gt;</button>
      </FlexContainer>
    );
  }

  private toggleVisibility = () => {
    this.setState((prevState) => ({
      isDayPickerVisible: !prevState.isDayPickerVisible,
    }));
  }
}

export default Navigation;
