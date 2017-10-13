import * as React from 'react';

import { FlexChild, FlexContainer } from '../../components/Flex';
import Loading from '../../components/Loading';
import { getUser } from './helpers';
import { IScheduleProps, IScheduleState } from './types';

class Schedule extends React.PureComponent<IScheduleProps, IScheduleState> {
  public state: IScheduleState = {
    user: undefined,
  };

  public componentDidMount() {
    getUser(this.props.userId).then(({ data: { user }, errors }) => {
      if (user) {
        this.setState({
          user,
        });
      } else if (errors) {
        throw new Error(errors.join('\n'));
      }
    }).catch((_error) => {
      // TODO: handle error
    });
  }

  public render() {
    if (this.state.user) {
      return (
        <FlexContainer flexDirection="row">
          <FlexChild flex="1">
            <p>First Name: {this.state.user.firstName}</p>
            <p>Last Name: {this.state.user.lastName}</p>
            <p>Company Name: {this.state.user.company.name}</p>
          </FlexChild>
        </FlexContainer>
      );
    }

    return <Loading message="Loading..." />;
  }
}

export default Schedule;
