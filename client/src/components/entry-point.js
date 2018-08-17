import Marketing from 'src/apps/marketing';
import React from 'react';
import Schedule from 'src/apps/schedule';
import SignIn from 'src/apps/sign-in';
import SignUp from 'src/apps/sign-up';
import { Router } from '@reach/router';

export default function EntryPoint() {
  return (
    <Router>
      <Marketing path="/" />
      <SignIn path="/sign-in" />
      <SignUp path="/sign-up" />
      <Schedule path="/schedule" />
    </Router>
  );
}
