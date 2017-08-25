import * as React from 'react';

import Failure from '../../../../components/Failure';
import Loading from '../../../../components/Loading';
import { IMyCompaniesProps } from './types';

class MyCompanies extends React.PureComponent<IMyCompaniesProps, {}> {
  public componentDidMount() {
    this.props.requestCompaniesByUserId(this.props.userId);
  }

  public render() {
    const { companies, requestCompaniesByUserIdLoadingState } = this.props;

    if (requestCompaniesByUserIdLoadingState.isLoading()) {
      return <Loading message="Loading yours companies..." />;
    } else if (requestCompaniesByUserIdLoadingState.isFailure()) {
      return <Failure errors={requestCompaniesByUserIdLoadingState.errors()} />;
    }

    return (
      <div>
        {companies.map((company) => <p key={company.id}>{company.name}</p>)}
      </div>
    );
  }
}

export default MyCompanies;
