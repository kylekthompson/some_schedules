import performRequest from 'helpers/network/perform-request';

function buildHeaders(contentType) {
  const headers = new Headers();
  headers.append('Content-Type', contentType);
  return headers;
}

function buildFetchReturning(overrides = {}) {
  return jest.fn(() => ({
    headers: buildHeaders('application/json'),
    status: 200,
    ...overrides,
    text: jest.fn(() => JSON.stringify(overrides.json || {})),
  }));
}

describe('performRequest', () => {
  describe('when there is a json body', () => {
    it('camelizes and includes the body', async () => {
      const mockFetch = buildFetchReturning({
        headers: buildHeaders('application/json'),
        json: {
          should_be_camel: {
            should_be_camel: 'should_be_snake',
          },
        },
        status: 200,
      });

      const result = await performRequest({}, mockFetch);

      expect(result).toEqual({
        error: null,
        shouldBeCamel: {
          shouldBeCamel: 'should_be_snake',
        },
        status: 200,
      });
    });
  });

  describe('when there is not a json body', () => {
    it('does not include a body', async () => {
      const mockFetch = buildFetchReturning({
        headers: buildHeaders('html'),
        status: 200,
      });

      const result = await performRequest({}, mockFetch);

      expect(result).toEqual({
        error: null,
        status: 200,
      });
    });
  });

  describe('when the request was unauthorized', () => {
    it('has the correct error', async () => {
      const mockFetch = buildFetchReturning({
        status: 401,
      });

      const result = await performRequest({}, mockFetch);

      expect(result.status).toEqual(401);
      expect(result.error).toMatchSnapshot();
    });
  });

  describe('when the request was forbidden', () => {
    it('has the correct error', async () => {
      const mockFetch = buildFetchReturning({
        status: 403,
      });

      const result = await performRequest({}, mockFetch);

      expect(result.status).toEqual(403);
      expect(result.error).toMatchSnapshot();
    });
  });

  describe('when the request was any other 400', () => {
    it('has the correct error', async () => {
      const mockFetch = buildFetchReturning({
        status: 400,
      });

      const result = await performRequest({}, mockFetch);

      expect(result.status).toEqual(400);
      expect(result.error).toMatchSnapshot();
    });
  });
});
