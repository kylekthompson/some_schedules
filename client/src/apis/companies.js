import { post } from 'services/requests';

export function postCreate(company) {
  return post(`/api/companies`, {
    company,
  });
}
