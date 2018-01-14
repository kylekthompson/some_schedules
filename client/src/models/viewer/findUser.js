const findUser = (viewer, userId) => viewer.company.users.find((user) => user.id === userId);

export default findUser;
