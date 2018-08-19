export default function buildSharedOptions() {
  const headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  return {
    credentials: 'same-origin',
    headers,
  };
}
