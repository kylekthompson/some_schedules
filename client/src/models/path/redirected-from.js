import { get } from 'models/object';

export default function redirectedFrom(location = {}, defaultValue = '/') {
  return get(location, 'state.from.pathname', defaultValue);
}
