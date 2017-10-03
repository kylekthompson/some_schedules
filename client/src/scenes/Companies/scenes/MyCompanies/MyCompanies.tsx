import * as React from 'react';

import gql from 'graphql-tag';

import { graphql } from '../../../../services/graphql/helpers';
import { IMyCompaniesProps, IMyCompaniesState, IMyCompaniesQueryResult } from './types';

class MyCompanies extends React.PureComponent<IMyCompaniesProps, IMyCompaniesState> {
  public state: IMyCompaniesState = {
    queryResult: undefined,
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
          queryResult: data,
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
    if (!this.state.queryResult) { return <p>loading</p>; }

    return (
      <div>
        {this.state.queryResult.user.companyUsers.edges.map((companyUser) => <p key={companyUser.node.company.slug}>{companyUser.node.role} - {companyUser.node.company.name} - {companyUser.node.company.slug}</p>)}
      </div>
    );
  }
}

export default MyCompanies;
