import * as React from 'react';

import * as Button from 'react-bootstrap/lib/Button';

import { Redirect } from 'react-router-dom';

import { Input } from '../../components/Form';
import { ISignInMutationInput, signIn } from '../../services/graphql/mutations/signIn';
import { ISignInProps, ISignInState } from './types';
import * as validations from './validations';

class SignIn extends React.Component<ISignInProps, ISignInState> {
  public state: ISignInState = {
    auth: {
      email: '',
      password: '',
    },
    didSubmit: false,
    errors: {},
    user: undefined,
    validations: {
      email: false,
      password: false,
    },
  };

  public render() {
    if (this.props.isSignedIn && this.state.user) {
      return <Redirect to={`/companies/${this.state.user.company.slug}`} />;
    }

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
            serverErrors={this.state.errors.email}
            synchronousValidation={validations.syncEmailValidation}
            type="email"
            value={this.state.auth.email}
          />
          <Input
            autoComplete="current-password"
            label="Password"
            onChange={this.handleChange('password')}
            onValidation={this.handleValidation('password')}
            serverErrors={this.state.errors.password}
            synchronousValidation={validations.syncPasswordValidation}
            type="password"
            value={this.state.auth.password}
          />
          <Button type="submit" disabled={!this.isValid() || this.state.didSubmit}>
            Sign In
          </Button>
        </form>
      </div>
    );
  }

  private handleChange = (attr: keyof ISignInMutationInput) => (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      auth: {
        ...prevState.auth,
        [attr]: value,
      },
    }));
  }

  private handleValidation = (attr: keyof ISignInMutationInput) => (isValid: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        [attr]: isValid,
      },
    }));
  }

  private isValid = () => Object.values(this.state.validations).every((value) => Boolean(value));

  private signUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({
      didSubmit: true,
      errors: {},
    });

    signIn(this.state.auth).then(({ data: { signIn: { errors, token, user } } }) => {
      if (token && user) {
        this.props.persistSignIn(token);
        this.setState({
          user,
        });
      } else if (errors) {
        this.setState({
          didSubmit: false,
          errors,
        });
      } else {
        this.setState({
          didSubmit: false,
        });
      }
    }).catch(() => {
      this.setState({
        didSubmit: false,
      });
    });
  }
}

export default SignIn;
