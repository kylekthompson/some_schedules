import * as React from 'react';

import { Redirect } from 'react-router-dom';

import UserSignUp from '../UserSignUp';
import CompanySignUp from './scenes/CompanySignUp';
import { ISignUpProps, ISignUpState, SignUpPages } from './types';

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  public state: ISignUpState = {
    currentSignUpPage: SignUpPages.USER_SIGN_UP,
  };

  public componentWillReceiveProps(nextProps: ISignUpProps) {
    this.maybeShowFlash(this.props, nextProps, this.state.currentSignUpPage);

    if (!this.props.userCreation.loaded && nextProps.userCreation.loaded && nextProps.userCreation.value) {
      this.setState({
        currentSignUpPage: SignUpPages.COMPANY_SIGN_UP,
      });
    }
  }

  public render() {
    const { companyCreation, isSignedIn } = this.props;
    const { currentSignUpPage } = this.state;

    if (companyCreation.loaded && companyCreation.value && isSignedIn) {
      return <Redirect to="/" />;
    }

    if (currentSignUpPage === SignUpPages.USER_SIGN_UP) {
      return <UserSignUp shouldRedirectWhenSignedIn={false} />;
    }

    return <CompanySignUp />;
  }

  private maybeShowFlash = (currentProps: ISignUpProps, nextProps: ISignUpProps, currentSignUpPage: SignUpPages) => {
    this.maybeShowUserCreatedFlash(currentProps, nextProps, currentSignUpPage);
    this.maybeShowFinishedFlash(currentProps, nextProps, currentSignUpPage);
  }

  private maybeShowFinishedFlash = (
    currentProps: ISignUpProps,
    nextProps: ISignUpProps,
    currentSignUpPage: SignUpPages
  ) => {
    const shouldShowFinishedFlash =
      !currentProps.companyCreation.loaded &&
      nextProps.companyCreation.loaded &&
      nextProps.companyCreation.value &&
      currentSignUpPage === SignUpPages.COMPANY_SIGN_UP;

    if (shouldShowFinishedFlash) {
      this.props.clearFlashes();
      this.props.addFlash({
        render: () => <p>Great! You're all set and ready to start scheduling.</p>,
        severity: 'success',
      });
    }
  }

  private maybeShowUserCreatedFlash = (
    currentProps: ISignUpProps,
    nextProps: ISignUpProps,
    currentSignUpPage: SignUpPages
  ) => {
    const shouldShowUserCreatedFlash =
      !currentProps.userCreation.loaded &&
      nextProps.userCreation.loaded &&
      nextProps.userCreation.value &&
      currentSignUpPage === SignUpPages.USER_SIGN_UP;

    if (shouldShowUserCreatedFlash) {
      this.props.clearFlashes();
      this.props.addFlash({
        render: () => <p>Awesome. Now you just have to add your company and pick a URL.</p>,
        severity: 'success',
      });
    }
  }
}

export default SignUp;
