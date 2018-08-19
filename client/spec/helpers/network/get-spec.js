import { buildURL } from 'src/helpers/network/get';

describe('buildURL', () => {
  describe('when there is a trailing /', () => {
    describe('when there are params', () => {
      it('builds the url properly', () => {
        const url = buildURL('/api/foo/', {
          boolean: true,
          number: 1,
          shouldBeSnake: 'shouldBeCamel',
        });

        expect(url.toString()).toMatch(/\/api\/foo\?boolean=true&number=1&should_be_snake=shouldBeCamel$/);
      });
    });

    describe('when there are no params', () => {
      it('builds the url properly', () => {
        const url = buildURL('/api/foo/', {});

        expect(url.toString()).toMatch(/\/api\/foo$/);
      });
    });
  });

  describe('when there is not a trailing /', () => {
    describe('when there are params', () => {
      it('builds the url properly', () => {
        const url = buildURL('/api/foo', {
          boolean: true,
          number: 1,
          shouldBeSnake: 'shouldBeCamel',
        });

        expect(url.toString()).toMatch(/\/api\/foo\?boolean=true&number=1&should_be_snake=shouldBeCamel$/);
      });
    });

    describe('when there are no params', () => {
      it('builds the url properly', () => {
        const url = buildURL('/api/foo', {});

        expect(url.toString()).toMatch(/\/api\/foo$/);
      });
    });
  });
});
