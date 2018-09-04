import get from 'helpers/object/get';

describe('get', () => {
  describe('when the path is invalid', () => {
    it('throws', () => {
      expect(() => get({}, 1)).toThrow('Invalid path: 1');
    });
  });

  describe('when the object is null', () => {
    it('works', () => {
      expect(get(null, 'foo.bar')).toEqual(null);
      expect(get(null, 'foo.bar', 'default')).toEqual('default');

      expect(get(null, ['foo', 'bar'])).toEqual(null);
      expect(get(null, ['foo', 'bar'], 'default')).toEqual('default');
    });
  });

  describe('when the object is not null', () => {
    describe('when object has an array in it', () => {
      it('works', () => {
        const object = {
          array: [
            {
              key: 'value',
            },
          ],
        };

        expect(get(object, 'array[0].key')).toEqual('value');
        expect(get(object, 'array[0].key', 'default')).toEqual('value');
        expect(get(object, 'foo.bar')).toEqual(null);
        expect(get(object, 'foo.bar', 'default')).toEqual('default');
        expect(get(object, 'array')).toEqual([{ key: 'value' }]);
        expect(get(object, 'array', 'default')).toEqual([{ key: 'value' }]);

        expect(get(object, ['array', 0, 'key'])).toEqual('value');
        expect(get(object, ['array', 0, 'key'], 'default')).toEqual('value');
        expect(get(object, ['foo', 'bar'])).toEqual(null);
        expect(get(object, ['foo', 'bar'], 'default')).toEqual('default');
        expect(get(object, ['array'])).toEqual([{ key: 'value' }]);
        expect(get(object, ['array'], 'default')).toEqual([{ key: 'value' }]);
      });
    });

    describe('when object is nested deeply', () => {
      it('works', () => {
        const object = {
          a: {
            very: {
              deep: {
                key: 'value',
              },
            },
          },
        };

        expect(get(object, 'a.very.deep.key')).toEqual('value');
        expect(get(object, 'a.very.deep.key', 'default')).toEqual('value');
        expect(get(object, 'a.very.deep.notAKey')).toEqual(null);
        expect(get(object, 'a.very.deep.notAKey', 'default')).toEqual('default');
        expect(get(object, 'a.very.deep')).toEqual({ key: 'value' });
        expect(get(object, 'a.very.deep', 'default')).toEqual({ key: 'value' });

        expect(get(object, ['a', 'very', 'deep', 'key'])).toEqual('value');
        expect(get(object, ['a', 'very', 'deep', 'key'], 'default')).toEqual('value');
        expect(get(object, ['a', 'very', 'deep', 'notAKey'])).toEqual(null);
        expect(get(object, ['a', 'very', 'deep', 'notAKey'], 'default')).toEqual('default');
        expect(get(object, ['a', 'very', 'deep'])).toEqual({ key: 'value' });
        expect(get(object, ['a', 'very', 'deep'], 'default')).toEqual({ key: 'value' });
      });
    });
  });
});
