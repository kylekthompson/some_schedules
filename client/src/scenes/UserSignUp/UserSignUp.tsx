import * as React from 'react';

import * as Button from 'react-bootstrap/lib/Button';

import { Redirect } from 'react-router-dom';

import { Input } from '../../components/Form';
import { IUserForCreation } from '../../services/api/users/types';
import { IUserSignUpProps, IUserSignUpState } from './types';
import * as validations from './validations';

class UserSignUp extends React.Component<IUserSignUpProps, IUserSignUpState> {
  public defaultProps: Partial<IUserSignUpProps> = {
    shouldRedirectWhenSignedIn: true,
  };
  public state: IUserSignUpState = {
    didSubmit: false,
    user: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
    },
    validations: {
      email: false,
      firstName: false,
      lastName: false,
      password: false,
      passwordConfirmation: false,
    },
  };

  public render() {
    if (this.props.shouldRedirectWhenSignedIn && this.props.isSignedIn) { return <Redirect to="/" />; }

    return (
      <div>
        <form onSubmit={this.signUp}>
          <Input
            autoFocus
            autoComplete="given-name"
            label="First Name"
            onChange={this.handleChange('firstName')}
            onValidation={this.handleValidation('firstName')}
            placeholder="Jane"
            serverErrors={this.props.userCreation.errors.firstName}
            synchronousValidation={validations.syncFirstNameValidation}
            type="text"
            value={this.state.user.firstName}
          />
          <Input
            autoComplete="family-name"
            label="Last Name"
            onChange={this.handleChange('lastName')}
            onValidation={this.handleValidation('lastName')}
            placeholder="Smith"
            serverErrors={this.props.userCreation.errors.lastName}
            synchronousValidation={validations.syncLastNameValidation}
            type="text"
            value={this.state.user.lastName}
          />
          <Input
            autoComplete="email"
            label="Email Address"
            onChange={this.handleChange('email')}
            onValidation={this.handleValidation('email')}
            placeholder="jane@example.com"
            serverErrors={this.props.userCreation.errors.email}
            synchronousValidation={validations.syncEmailValidation}
            type="email"
            value={this.state.user.email}
          />
          <Input
            autoComplete="new-password"
            label="Password"
            onChange={this.handleChange('password')}
            onValidation={this.handleValidation('password')}
            serverErrors={this.props.userCreation.errors.password}
            synchronousValidation={validations.syncPasswordValidation}
            type="password"
            value={this.state.user.password}
          />
          <Input
            autoComplete="new-password"
            label="Password Confirmation"
            onChange={this.handleChange('passwordConfirmation')}
            onValidation={this.handleValidation('passwordConfirmation')}
            serverErrors={this.props.userCreation.errors.passwordConfirmation}
            synchronousValidation={validations.syncPasswordComfirmationValidation(this.state.user.password)}
            type="password"
            value={this.state.user.passwordConfirmation}
          />
          <Button type="submit" disabled={!this.isValid()}>
            Sign Up
          </Button>
        </form>
      </div>
    );
  }

  private handleChange = (attr: keyof IUserForCreation) => (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [attr]: value,
      },
    }));
  }

  private handleValidation = (attr: keyof IUserForCreation) => (isValid: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        [attr]: isValid,
      },
    }));
  }

  private isValid = () => Object.values(this.state.validations).every((value) => value);

  private signUp = (event) => {
    event.preventDefault();
    this.props.requestSignUp(this.state.user);
  }
}

export default UserSignUp;
