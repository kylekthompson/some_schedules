import React from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { postSignUp as signUp } from 'apis/authentication';
import { Consumer } from 'components/Authentication';
import SignUpForm from 'components/SignUpForm';
import { redirectedFrom } from 'models/path';
import { Container } from 'scenes/SignUp/components';

class SignUp extends React.Component {
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
    signUp: PropTypes.func,
  };

  static defaultProps = {
    location: {},
    signUp,
  };

  state = {
    error: null,
    errors: {},
  };

  handleSubmit = (form) => {
    const { name, slug, ...user } = form;
    const company = { name, slug };

    this.props.signUp(user, company).then(({ context, error, errors }) => {
      if (context && context.isSignedIn) {
        this.props.requestSignIn(context);
      } else {
        this.setState({
          error,
          errors,
        });
      }
    });
  }

  render() {
    if (this.props.isSignedIn) { return <Redirect to={redirectedFrom(this.props.location)} />; }

    return (
      <Container>
        <SignUpForm
          error={this.state.error}
          errors={this.state.errors}
          onSubmit={this.handleSubmit}
          testId="sign-up-form"
        />
      </Container>
    );
  }
}

export default (props) => (
  <Consumer
    render={({ isSignedIn, requestSignIn }) => (
      <SignUp
        isSignedIn={isSignedIn}
        requestSignIn={requestSignIn}
        {...props}
      />
    )}
  />
);
