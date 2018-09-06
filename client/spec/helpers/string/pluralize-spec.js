import pluralize from 'helpers/string/pluralize';

describe('pluralize', () => {
  describe('easy pluralizations', () => {
    it('handles 0, 1, and many items', () => {
      expect(pluralize(0, 'item')).toEqual('items');
      expect(pluralize(1, 'item')).toEqual('item');
      expect(pluralize(2, 'item')).toEqual('items');
    });
  });

  describe('complex pluralizations', () => {
    it('handles 0, 1, and many items', () => {
      expect(pluralize(0, 'cactus', 'cacti')).toEqual('cacti');
      expect(pluralize(1, 'cactus', 'cacti')).toEqual('cactus');
      expect(pluralize(2, 'cactus', 'cacti')).toEqual('cacti');
    });
  });
});
