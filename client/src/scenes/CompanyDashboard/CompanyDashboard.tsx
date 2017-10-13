import * as React from 'react';

import { gql, graphql } from '../../services/graphql/helpers';
import { ICompanyDashboardProps, ICompanyDashboardQueryResult, ICompanyDashboardState } from './types';

class CompanyDashboard extends React.PureComponent<ICompanyDashboardProps, ICompanyDashboardState> {
  public state: ICompanyDashboardState = {
    company: undefined,
  };

  public componentDidMount() {
    graphql.query<ICompanyDashboardQueryResult>({
      query: gql`
        query Company($slug: String!) {
          company(slug: $slug) {
            name
            slug
          }
        }
      `,
      variables: {
        slug: this.props.match.params.slug,
      },
    }).then(({ data: { company } }) => {
      if (company) {
        this.setState({
          company,
        });
      }
    });
  }

  public render() {
    if (this.state.company) {
      return <p>{this.state.company.name} {this.state.company.slug}</p>;
    }

    return <p>loading</p>;
  }
}

export default CompanyDashboard;
