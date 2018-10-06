import React from 'react';
import Sidebar from 'apps/signed-in-entry-point/components/sidebar';
import { User } from 'spec/support/factories';
import { mountAsApp } from 'spec/support/mount';

const owner = new User().asOwner();
const employee = new User().asEmployee();

describe('<Sidebar />', () => {
  describe('as an owner', () => {
    it('shows the Schedule link', () => {
      const { getByText } = mountAsApp(<Sidebar user={owner} />);

      getByText('Schedule');
    });

    it('shows the Company Settings link', () => {
      const { getByText } = mountAsApp(<Sidebar user={owner} />);

      getByText('Company Settings');
    });
  });

  describe('as a different role', () => {
    it('shows the Schedule link', () => {
      const { getByText } = mountAsApp(<Sidebar user={employee} />);

      getByText('Schedule');
    });

    it('does not show the Company Settings link', () => {
      const { queryByText } = mountAsApp(<Sidebar user={employee} />);

      expect(queryByText('Company Settings')).toBeNull();
    });
  });
});
