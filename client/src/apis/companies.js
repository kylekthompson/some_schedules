import { post } from 'src/helpers/network';

export function postCreate(company) {
  return post('/api/companies', {
    company,
  });
}
