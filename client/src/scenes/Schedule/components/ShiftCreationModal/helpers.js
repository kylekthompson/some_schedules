const ALLOWED_HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const parseTimeInput = (day, timeInput) => {
  if (!timeInput) { return null; }

  // matches strings that look like one of these: '1a', '1 pm', '1:00p', '1:00 am'
  const timePieces = timeInput.match(/(?:(\d+)(?::(\d+))?(?:\s*)((?:a|p)m?)?)/i);
  const [, hours, minutes, period] = Array.from(timePieces || []);
  const currentMoment = day.clone().startOf('day');

  if (hours && ALLOWED_HOURS.some((hour) => hour === parseInt(hours.slice(0, 2), 10))) {
    currentMoment.hours(parseInt(hours.slice(0, 2), 10));
  } else {
    return null;
  }

  if (minutes && minutes.match(/[012345]\d/)) {
    currentMoment.minutes(parseInt(minutes.slice(0, 2), 10));
  }

  if (period && period.includes('p')) {
    currentMoment.add(12, 'hours');
  }

  return currentMoment;
};

export const parseTimesInput = (day, timesInput) => {
  const [startTime, endTime] = timesInput.split(/\s*-\s*/i).slice(0, 2).map((input) => parseTimeInput(day, input));

  if (startTime && endTime && endTime.isBefore(startTime)) {
    endTime.add(1, 'day');
  }

  return [startTime, endTime];
};
