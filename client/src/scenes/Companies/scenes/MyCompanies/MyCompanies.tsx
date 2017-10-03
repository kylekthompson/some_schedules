import * as React from 'react';

import gql from 'graphql-tag';

import { graphql } from '../../../../services/graphql/helpers';
import { IMyCompaniesProps, IMyCompaniesState } from './types';

class MyCompanies extends React.PureComponent<IMyCompaniesProps, IMyCompaniesState> {
  public state: IMyCompaniesState = {
    companies: undefined,
  };

  public componentDidMount() {
    graphql.query<any>({
      query: gql`
        query MyCompanies($userId: ID!) {
          companies(userId: $userId) {
            id
            name
            slug
            createdAt
          }
        }
      `,
      variables: { userId: this.props.userId },
    }).then(({ data }) => {
      if (data.companies) {
        this.setState({
          companies: data.companies,
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
    if (!this.state.companies) { return <p>loading</p>; }

    return (
      <div>
        {this.state.companies.map((company) => <p key={company.id}>{company.name} - {company.slug}</p>)}
      </div>
    );
  }
}

export default MyCompanies;
