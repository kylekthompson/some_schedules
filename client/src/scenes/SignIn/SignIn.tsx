import * as React from 'react';

import * as Button from 'react-bootstrap/lib/Button';

import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';

import { Input } from '../../components/Form';
import { IAuthenticationCredentials } from '../../services/api/authentication/types';
import { signIn } from '../../services/graphql/mutations/signIn';
import { ISignInProps, ISignInState } from './types';
import * as validations from './validations';

class SignIn extends React.Component<ISignInProps, ISignInState> {
  public state: ISignInState = {
    auth: {
      email: '',
      password: '',
    },
    didSubmit: false,
    validations: {
      email: false,
      password: false,
    },
  };

  public render() {
    if (this.props.isSignedIn) { return <Redirect to="/" />; }

    return (
      <div>
        <form onSubmit={this.signUp}>
          <Input
            autoFocus
            autoComplete="email"
            label="Email Address"
            onChange={this.handleChange('email')}
            onValidation={this.handleValidation('email')}
            placeholder="jane@example.com"
            synchronousValidation={validations.syncEmailValidation}
            type="email"
            value={this.state.auth.email}
          />
          <Input
            autoComplete="current-password"
            label="Password"
            onChange={this.handleChange('password')}
            onValidation={this.handleValidation('password')}
            synchronousValidation={validations.syncPasswordValidation}
            type="password"
            value={this.state.auth.password}
          />
          <Button type="submit" disabled={!this.isValid()}>
            Sign In
          </Button>
        </form>
      </div>
    );
  }

  private handleChange = (attr: keyof IAuthenticationCredentials) => (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      auth: {
        ...prevState.auth,
        [attr]: value,
      },
    }));
  }

  private handleValidation = (attr: keyof IAuthenticationCredentials) => (isValid: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        [attr]: isValid,
      },
    }));
  }

  private isValid = () => Object.values(this.state.validations).every((value) => value);

  private signUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signIn(this.state.auth).then(({ data: { signIn: { token } } }) => {
      if (token) {
        this.props.persistSignIn(token);
      } else {
        this.props.addFlash({
          render: () => <p>Uh oh, that didn't work! Try using a different email or password.</p>,
          severity: 'danger',
        });
      }
    }).catch(() =>
      this.props.addFlash({
        render: () => <p>Uh oh, we seem to have hit a snag... We'll look into that. Sorry!</p>,
        severity: 'danger',
      })
    );
  }
}

export default SignIn;
