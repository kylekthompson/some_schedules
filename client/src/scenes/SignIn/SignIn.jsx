import React from 'react';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import { Redirect } from 'react-router-dom';

import { Input } from 'components/Form';
import { signIn } from 'services/graphql/mutations/signIn';

import * as validations from 'scenes/SignIn/validations';

class SignIn extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    persistSignIn: PropTypes.func.isRequired,
  };

  state = {
    auth: {
      email: '',
      password: '',
    },
    didSubmit: false,
    errors: {},
    validations: {
      email: false,
      password: false,
    },
  };

  render() {
    if (this.props.isSignedIn) {
      return <Redirect to="/schedule" />;
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

  handleChange = (attr) => (event) => {
    const value = event.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      auth: {
        ...prevState.auth,
        [attr]: value,
      },
    }));
  }

  handleValidation = (attr) => (isValid) => {
    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        [attr]: isValid,
      },
    }));
  }

  isValid = () => Object.values(this.state.validations).every((value) => Boolean(value));

  signUp = (event) => {
    event.preventDefault();

    this.setState({
      didSubmit: true,
      errors: {},
    });

    signIn(this.state.auth).then(({ data: { signIn: { errors, token } } }) => {
      if (token) {
        this.props.persistSignIn(token);
      } else {
        this.setState({
          didSubmit: false,
          errors: errors || {},
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
