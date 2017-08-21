import * as React from 'react';

import { SignUpPages } from '../../types';
import { IHelpProps } from './types';

const Help = ({ currentSignUpPage }: IHelpProps) => (
  <div>
    <h3>Hello!</h3>
    <p>Thanks for trying out SomeSchedul.es! To get started, we'll ask you to create a new user and your company.</p>
    <ol>
      <li style={currentSignUpPage === SignUpPages.USER_SIGN_UP ? { fontWeight: 'bold'} : {}}>
        User Sign Up
        <ul>
          <li>
            This will be your owner account and will give you the ability to add employees, business locations,
            shifts, and more.
          </li>
        </ul>
      </li>
      <li style={currentSignUpPage === SignUpPages.COMPANY_SIGN_UP ? { fontWeight: 'bold'} : {}}>
        Company Creation
        <ul>
          <li>This will create the company that holds your locations, employees, and schedules.</li>
          <li>
            In addition, you will create a URL to access your schedules. It'll look like this:
            https://someschedul.es/companies/my-company/schedules
          </li>
        </ul>
      </li>
    </ol>
  </div>
);

export default Help;
