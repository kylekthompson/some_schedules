import React from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import SignUpForm from 'components/SignUpForm';
import { Container } from 'scenes/SignUp/components';
import { signUp } from 'services/graphql/mutations/signUp';

class SignUp extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
  };

  state = {
    errors: {},
  };

  render() {
    if (this.props.isSignedIn) { return <Redirect to="/" />; }

    return (
      <Container>
        <SignUpForm
          errors={this.state.errors}
          onSubmit={this.handleSubmit}
        />
      </Container>
    );
  }

  handleSubmit = (form) => {
    const { name, slug, ...user } = form;
    const company = { name, slug };

    signUp({ company, user, }).then(({
      data: {
        signUp: {
          companyErrors,
          errors,
          userErrors,
          token,
        },
      },
    }) => {
      if (token) {
        this.props.requestSignIn(token);
      } else {
        this.setState({
          errors: {
            ...(companyErrors || {}),
            ...(userErrors || {}),
            ...(errors || {}),
          },
        });
      }
    })
  }
}

export default SignUp;
