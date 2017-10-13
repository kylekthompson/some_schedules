import * as React from 'react';

import { Redirect } from 'react-router-dom';

import Loading from '../../components/Loading';
import { getUser } from './helpers';
import { ICompaniesProps, ICompaniesState } from './types';

class Companies extends React.PureComponent<ICompaniesProps, ICompaniesState> {
  public state: ICompaniesState = {
    user: undefined,
  };

  public componentDidMount() {
    getUser(this.props.userId).then(({ data: { user }, errors }) => {
      if (user) {
        this.setState({
          user,
        });
      } else if (errors) {
        throw new Error(errors.join('\n'));
      }
    }).catch((_error) => {
      // TODO: handle error
    });
  }

  public render() {
    if (this.state.user) {
      return <Redirect to={`/companies/${this.state.user.company.slug}`} />;
    }

    return <Loading message="Loading..." />;
  }
}

export default Companies;
