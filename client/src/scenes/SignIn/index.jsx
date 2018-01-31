import React from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import SignInForm from 'components/SignInForm';
import { Container } from 'scenes/SignIn/components';
import { signIn } from 'services/graphql/mutations/signIn';

class SignIn extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
    signIn: PropTypes.func,
  };

  static defaultProps = {
    signIn,
  };

  state = {
    errors: {},
  };

  handleSubmit = (form) => {
    this.props.signIn(form).then(({ data: { signIn: { errors, token } } }) => {
      if (token) {
        this.props.requestSignIn(token);
      } else {
        this.setState({
          errors: errors || {},
        });
      }
    });
  }

  render() {
    if (this.props.isSignedIn) { return <Redirect to="/" />; }

    return (
      <Container>
        <SignInForm
          errors={this.state.errors}
          onSubmit={this.handleSubmit}
          testId="sign-in-form"
        />
      </Container>
    );
  }
}

export default SignIn;
