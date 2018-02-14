import { startOfWeek } from 'models/time';
import format from 'models/time/format';

describe('format', () => {
  describe('forCalendar()', () => {
    it('is formatted properly', () => {
      const date = new Date(2018, 11, 25);
      expect(format.forCalendar(date)).toEqual('December 2018');
    });
  });

  describe('forSchedule()', () => {
    describe('when the date has minutes', () => {
      it('is formatted properly', () => {
        const date = new Date(2018, 11, 25, 8, 15);
        expect(format.forSchedule(date)).toEqual('8:15am');
      });
    });

    describe('when the date does not have minutes', () => {
      it('is formatted properly', () => {
        const date = new Date(2018, 11, 25, 8, 0);
        expect(format.forSchedule(date)).toEqual('8am');
      });
    });
  });

  describe('forServer()', () => {
    it('is formatted properly', () => {
      const date = new Date(Date.UTC(2018, 11, 25));
      expect(format.forServer(date)).toEqual('2018-12-25T00:00:00.000Z');
    });
  });

  describe('shortWeekdayOnly()', () => {
    it('is formatted properly', () => {
      const date = startOfWeek(new Date(2018, 11, 25));
      expect(format.shortWeekdayOnly(date)).toEqual('Sun');
    });
  });
});
