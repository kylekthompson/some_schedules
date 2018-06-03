import parse from 'date-fns/parse';

export default function toDate(dateString) {
  return parse(dateString);
}
