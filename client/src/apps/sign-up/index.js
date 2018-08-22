import React from 'react';
import { authenticated } from 'src/components/authentication';

export function SignUp() {
  return <p>Sign Up App</p>;
}

export default authenticated(SignUp);
