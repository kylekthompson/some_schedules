const shiftsForUserId = (shifts, userId) => shifts.filter((shift) => shift.user.id === userId);

export default shiftsForUserId;
