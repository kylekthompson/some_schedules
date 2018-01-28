import Moment from 'moment-timezone';

import format from 'models/time/format';

describe('format', () => {
  describe('forCalendar()', () => {
    it('is formatted properly', () => {
      const moment = Moment([2018, 11, 25]);
      expect(format.forCalendar(moment)).toEqual('December 2018');
    });
  });

  describe('forSchedule()', () => {
    describe('when the moment has minutes', () => {
      it('is formatted properly', () => {
        const moment = Moment([2018, 11, 25, 8, 15]);
        expect(format.forSchedule(moment)).toEqual('8:15am');
      });
    });

    describe('when the moment does not have minutes', () => {
      it('is formatted properly', () => {
        const moment = Moment([2018, 11, 25, 8, 0]);
        expect(format.forSchedule(moment)).toEqual('8am');
      });
    });
  });

  describe('forServer()', () => {
    it('is formatted properly', () => {
      const moment = Moment([2018, 11, 25]);
      expect(format.forServer(moment)).toEqual('2018-12-25T05:00:00.000Z');
    });
  });

  describe('shortWeekdayOnly()', () => {
    it('is formatted properly', () => {
      const moment = Moment([2018, 11, 25]).startOf('week');
      expect(format.shortWeekdayOnly(moment)).toEqual('Sun');
    });
  });
});
