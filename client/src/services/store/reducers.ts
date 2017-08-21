import authentication from './Authentication/reducer';
import companies from './Companies/reducer';
import companyUsers from './CompanyUsers/reducer';
import flashes from './Flashes/reducer';
import users from './Users/reducer';

const reducers = {
  authentication,
  companies,
  companyUsers,
  flashes,
  users,
};

export default reducers;
