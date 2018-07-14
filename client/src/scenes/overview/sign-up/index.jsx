import PropTypes from 'prop-types';
import React from 'react';
import SignUpForm from 'components/sign-up-form';
import { Container } from 'scenes/overview/sign-up/styled-components';
import { Redirect } from 'react-router-dom';
import { authenticated } from 'components/authentication';
import { postCreate as createCompany } from 'apis/companies';
import { postCreate as createUser } from 'apis/users';
import { getAuthentication as getAuthenticationContext } from 'apis/contexts';
import { redirectedFrom } from 'models/path';

export class SignUp extends React.Component {
  static propTypes = {
    createCompany: PropTypes.func,
    createUser: PropTypes.func,
    getAuthenticationContext: PropTypes.func,
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({
          pathname: PropTypes.string,
        }),
      }),
    }),
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    createCompany,
    createUser,
    getAuthenticationContext,
    location: {},
  };

  state = {
    error: null,
    errors: {},
  };

  handleSubmit = async (form) => {
    const { name, slug, ...user } = form;
    const company = { name, slug };

    try {
      const { errors: userErrors } = await this.props.createUser(user);

      if (userErrors) {
        this.setState({ errors: userErrors });
        return;
      }

      const { errors: companyErrors } = await this.props.createCompany(company);

      if (companyErrors) {
        this.setState({ errors: companyErrors });
        return;
      }

      const { context } = await this.props.getAuthenticationContext();

      if (context && context.isSignedIn) {
        this.props.requestSignIn(context);
      }
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  render() {
    if (this.props.isSignedIn) {
      return (
        <Redirect to={redirectedFrom(this.props.location, '/app/schedule')} />
      );
    }

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

export default authenticated(SignUp);
