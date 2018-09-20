import roles from 'models/user/roles';

export default function isManagerial(user) {
  return user && [roles.OWNER, roles.MANAGER].includes(user.role);
}
