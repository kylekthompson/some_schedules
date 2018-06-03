import {
  addDays,
  addHours,
  isBefore,
  setHours,
  setMinutes,
  startOfDay,
} from 'models/time';

const ALLOWED_HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function parseInputPiece(day, timeInput) {
  if (!timeInput) {
    return null;
  }

  // matches strings that look like one of these: '1a', '1 pm', '1:00p', '1:00 am'
  const timePieces = timeInput.match(
    /(?:(\d+)(?::(\d+))?(?:\s*)((?:a|p)m?)?)/i,
  );
  const [, hours, minutes, period] = Array.from(timePieces || []);
  let newDay = startOfDay(day);

  if (
    hours &&
    ALLOWED_HOURS.some((hour) => hour === parseInt(hours.slice(0, 2), 10))
  ) {
    newDay = setHours(newDay, parseInt(hours.slice(0, 2), 10));
  } else {
    return null;
  }

  if (minutes && minutes.match(/[012345]\d/)) {
    newDay = setMinutes(newDay, parseInt(minutes.slice(0, 2), 10));
  }

  if (period && period.includes('p')) {
    newDay = addHours(newDay, 12);
  }

  return newDay;
}

export default function parseInput(day, timesInput) {
  const [startTime, endTime] = timesInput
    .split(/\s*-\s*/i)
    .slice(0, 2)
    .map((input) => parseInputPiece(day, input));
  let updatedEndTime = endTime;

  if (startTime && endTime && isBefore(endTime, startTime)) {
    updatedEndTime = addDays(endTime, 1);
  }

  return [startTime, updatedEndTime];
}
