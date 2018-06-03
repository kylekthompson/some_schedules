import PropTypes from 'prop-types';
import React from 'react';
import SignInForm from 'components/sign-in-form';
import { Container } from 'scenes/overview/sign-in/styled-components';
import { Redirect } from 'react-router-dom';
import { authenticated } from 'components/authentication';
import { postSignIn as signIn } from 'apis/authentication';
import { redirectedFrom } from 'models/path';

export class SignIn extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({
          pathname: PropTypes.string,
        }),
      }),
    }),
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
    signIn: PropTypes.func,
  };

  static defaultProps = {
    location: {},
    signIn,
  };

  state = {
    error: null,
  };

  handleSubmit = (form) => {
    this.props.signIn(form).then(({ context, error }) => {
      if (context && context.isSignedIn) {
        this.props.requestSignIn(context);
      } else {
        this.setState({
          error,
        });
      }
    });
  };

  render() {
    if (this.props.isSignedIn) {
      return (
        <Redirect to={redirectedFrom(this.props.location, '/app/schedule')} />
      );
    }

    return (
      <Container>
        <SignInForm
          error={this.state.error}
          onSubmit={this.handleSubmit}
          testId="sign-in-form"
        />
      </Container>
    );
  }
}

export default authenticated(SignIn);
