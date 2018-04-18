import React from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { postSignIn as signIn } from 'apis/authentication';
import { Consumer } from 'components/authentication';
import SignInForm from 'components/sign-in-form';
import { redirectedFrom } from 'models/path';
import { Container } from 'scenes/sign-in/components';

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
      return <Redirect to={redirectedFrom(this.props.location)} />;
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

export default (props) => (
  <Consumer
    render={({ isSignedIn, requestSignIn }) => (
      <SignIn
        isSignedIn={isSignedIn}
        requestSignIn={requestSignIn}
        {...props}
      />
    )}
  />
);
