export default function shiftsForUserId(shifts, userId) {
  return shifts.filter((shift) => shift.user.id === userId);
}
