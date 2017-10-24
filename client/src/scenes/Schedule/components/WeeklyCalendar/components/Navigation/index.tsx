import * as React from 'react';

import { FlexContainer } from '../../../../../../components/Flex';
import DayPicker from '../../../DayPicker';
import { INavigationProps, INavigationState } from './types';

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
        <DayPicker
          onClick={this.toggleVisibility}
          visible={isDayPickerVisible}
        />
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
