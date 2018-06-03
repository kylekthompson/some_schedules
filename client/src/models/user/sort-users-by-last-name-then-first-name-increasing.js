export default function sortUsersByLastNameThenFirstNameIncreasing(users) {
  return [...users].sort((user1, user2) => {
    if (user1.lastName.localeCompare(user2.lastName) === 0) {
      return user1.firstName.localeCompare(user2.firstName);
    }

    return user1.lastName.localeCompare(user2.lastName);
  });
}
