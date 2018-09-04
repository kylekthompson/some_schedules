import { post } from 'helpers/network';

export function postCreate(company) {
  return post('/api/companies', {
    company,
  });
}
