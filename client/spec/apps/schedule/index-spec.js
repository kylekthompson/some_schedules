import React from 'react';
import Schedule from 'apps/schedule';
import { Route } from 'react-router-dom';
import { mountAsApp } from 'spec/support/mount';

function App() {
  return <Route component={Schedule} path="/schedule" />;
}

describe('<Schedule />', () => {
  it('renders the schedule', () => {
    const { getByText } = mountAsApp(<App />, {
      route: '/schedule',
    });

    getByText('Schedule');
  });
});
