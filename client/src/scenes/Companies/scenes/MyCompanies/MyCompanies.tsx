import * as React from 'react';

import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';

import { graphql } from '../../../../services/graphql/helpers';
import CompanyUsers from './components/CompanyUsers';
import { IMyCompaniesProps, IMyCompaniesState, IMyCompaniesQueryResult } from './types';

class MyCompanies extends React.PureComponent<IMyCompaniesProps, IMyCompaniesState> {
  public state: IMyCompaniesState = {
    companyUsers: undefined,
  };

  public componentDidMount() {
    graphql.query<IMyCompaniesQueryResult>({
      query: gql`
        query MyCompanies($userId: ID!) {
          user(id: $userId) {
            companyUsers {
              edges {
                node {
                  role
                  company {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      `,
      variables: { userId: this.props.userId },
    }).then(({ data }) => {
      if (data.user) {
        this.setState({
          companyUsers: data.user.companyUsers.edges.map((edge) => edge.node),
        });
      } else {
        this.props.addFlash({
          render: () => <p>Uh oh, we seem to have hit a snag... We'll look into that. Sorry!</p>,
          severity: 'danger',
        });
      }
    }).catch(() =>
      this.props.addFlash({
        render: () => <p>Uh oh, we seem to have hit a snag... We'll look into that. Sorry!</p>,
        severity: 'danger',
      })
    );
  }

  public render() {
    if (!this.state.companyUsers) { return <p>loading</p>; }
    if (this.state.companyUsers.length === 1) {
      return <Redirect to={`/companies/${this.state.companyUsers[0].company.slug}`} />;
    }
    return <CompanyUsers companyUsers={this.state.companyUsers} />;
  }
}

export default MyCompanies;
