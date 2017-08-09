import * as React from 'react';

import * as Alert from 'react-bootstrap/lib/Alert';
import * as Button from 'react-bootstrap/lib/Button';

import { Redirect } from 'react-router-dom';

import { Input } from '../../components/Form';
import { IUserForCreation } from '../../services/api/types';
import { ISignUpProps, ISignUpState } from './types';
import * as validations from './validations';

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  public state: ISignUpState = {
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
    if (this.props.isSignedIn) { return <Redirect to="/" />; }

    return (
      <div>
        <form onSubmit={this.signUp}>
          {Object.keys(this.props.errors).length > 0 && this.renderAlert()}
          <Input
            autoFocus
            autoComplete="given-name"
            label="First Name"
            onChange={this.handleChange('firstName')}
            onValidation={this.handleValidation('firstName')}
            placeholder="Jane"
            type="text"
            serverErrors={this.props.errors.firstName}
            synchronousValidation={validations.validateHasCharacters}
            value={this.state.user.firstName}
          />
          <Input
            autoFocus
            autoComplete="family-name"
            label="Last Name"
            onChange={this.handleChange('lastName')}
            onValidation={this.handleValidation('lastName')}
            placeholder="Smith"
            type="text"
            serverErrors={this.props.errors.lastName}
            synchronousValidation={validations.validateHasCharacters}
            value={this.state.user.lastName}
          />
          <Input
            autoFocus
            autoComplete="email"
            label="Email Address"
            onChange={this.handleChange('email')}
            onValidation={this.handleValidation('email')}
            placeholder="jane@example.com"
            type="email"
            serverErrors={this.props.errors.email}
            synchronousValidation={validations.validateEmailFormat}
            value={this.state.user.email}
          />
          <Input
            autoComplete="new-password"
            label="Password"
            onChange={this.handleChange('password')}
            onValidation={this.handleValidation('password')}
            type="password"
            serverErrors={this.props.errors.password}
            synchronousValidation={validations.validatePasswordFormat}
            value={this.state.user.password}
          />
          <Input
            autoComplete="new-password"
            label="Password Confirmation"
            onChange={this.handleChange('passwordConfirmation')}
            onValidation={this.handleValidation('passwordConfirmation')}
            type="password"
            serverErrors={this.props.errors.passwordConfirmation}
            synchronousValidation={validations.validatePasswordFormat}
            value={this.state.user.passwordConfirmation}
          />
          <Button type="submit" disabled={!this.isValid()}>
            Sign Up
          </Button>
        </form>
      </div>
    );
  }

  private renderAlert = () => (
    <Alert bsStyle="danger">
      <p>Uh oh! Check your email or password.</p>
    </Alert>
  )

  private handleChange = (attribute: keyof IUserForCreation) => (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [attribute]: value,
      },
    }));
  }

  private handleValidation = (attribute: keyof IUserForCreation) => (isValid: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        [attribute]: isValid,
      },
    }));
  }

  private isValid = () => Object.values(this.state.validations).every((value) => value);

  private signUp = (event) => {
    event.preventDefault();
    this.props.requestSignUp(this.state.user);
  }
}

export default SignUp;
