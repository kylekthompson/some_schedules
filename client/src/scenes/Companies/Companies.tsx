import * as React from 'react';

import { Redirect } from 'react-router-dom';

import { gql, graphql } from '../../services/graphql/helpers';
import { ICompaniesProps, ICompaniesQueryResult, ICompaniesState } from './types';

class Companies extends React.PureComponent<ICompaniesProps, ICompaniesState> {
  public state: ICompaniesState = {
    user: undefined,
  };

  public componentDidMount() {
    graphql.query<ICompaniesQueryResult>({
      query: gql`
        query User($id: ID!) {
          user(id: $id) {
            company {
              slug
            }
          }
        }
      `,
      variables: {
        id: this.props.userId,
      },
    }).then(({ data: { user } }) => {
      if (user) {
        this.setState({
          user,
        });
      }
    });
  }

  public render() {
    if (this.state.user) {
      return <Redirect to={`/companies/${this.state.user.company.slug}`} />;
    }

    return <p>loading</p>;
  }
}

export default Companies;
