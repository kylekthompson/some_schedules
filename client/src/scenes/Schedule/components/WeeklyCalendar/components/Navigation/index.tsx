import * as React from 'react';

import { FlexContainer } from '../../../../../../components/Flex';
import DayPicker from '../../../DayPicker';
import { INavigationProps, INavigationState } from './types';

class Navigation extends React.Component<INavigationProps, INavigationState> {
  public state: INavigationState = {
    isDayPickerVisible: false,
  };

  public render() {
    const { onDayPick, selectedDay } = this.props;
    const { isDayPickerVisible } = this.state;

    return (
      <FlexContainer
        alignSelf="flex-end"
        flexDirection="row"
      >
        <button onClick={onDayPick(selectedDay.clone().subtract(1, 'week'))}>&lt;</button>
        <DayPicker
          onClick={this.toggleVisibility}
          onDayPick={onDayPick}
          selectedDay={selectedDay}
          visible={isDayPickerVisible}
        />
        <button onClick={onDayPick(selectedDay.clone().add(1, 'week'))}>&gt;</button>
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
