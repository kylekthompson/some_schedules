import CompanySignUp from './CompanySignUp';

import { connect } from 'react-redux';

import { IApplicationState } from '../../services/store/types';
import { ICompanySignUpProps } from './types';

const mapStateToProps = (state: IApplicationState): Partial<ICompanySignUpProps> => ({
  isSignedIn: state.authentication.isSignedIn,
});

export default connect(mapStateToProps)(CompanySignUp);
