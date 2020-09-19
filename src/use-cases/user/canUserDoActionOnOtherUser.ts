import User from '@/entities/User';
import { UserRole } from '@/enums';

type Args = {
  user: User;
  otherUserId: User['id'];
  rolesThatBypassVerification?: UserRole[];
};
export default function (args: Args): boolean {
  const { user, otherUserId, rolesThatBypassVerification = [] } = args;
  const { id, role } = user;

  // if the user is trying to do an action on themselves they're allowed to do it
  if (id === otherUserId) return true;

  // if the user has a role that can bypass the verification, an ADMIN, for example
  // they're allowed to do the action
  const userHasRoleToBypassVerification = rolesThatBypassVerification.includes(role);
  if (userHasRoleToBypassVerification) return true;

  return false;
}
