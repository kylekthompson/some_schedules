import * as React from 'react';

import { Redirect } from 'react-router-dom';

import CompanySignUp from '../CompanySignUp';
import UserSignUp from '../UserSignUp';
import Help from './components/Help';
import { ISignUpProps, ISignUpState } from './types';

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  public state: ISignUpState = {
    didSignUpCompany: false,
    didSignUpUser: false,
  };

  public render() {
    const { didSignUpCompany, didSignUpUser } = this.state;

    if (didSignUpCompany && didSignUpUser) {
      return <Redirect to="/" />;
    }

    return this.renderCorrectSignUp();
  }

  private renderCorrectSignUp = () => {
    const { didSignUpUser } = this.state;

    let signUpPage;

    if (!didSignUpUser) {
      signUpPage = (
        <UserSignUp
          shouldRedirectWhenSignedIn={false}
          onSignUpSuccess={this.onSuccess('didSignUpUser')}
        />
      );
    } else {
      signUpPage = (
        <CompanySignUp
          onSignUpSuccess={this.onSuccess('didSignUpCompany')}
        />
      );
    }

    return (
      <div>
        <Help showUserHelp={!didSignUpUser} />
        {signUpPage}
      </div>
    );
  }

  private onSuccess = (field: keyof ISignUpState) => () => {
    this.setState((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }
}

export default SignUp;
