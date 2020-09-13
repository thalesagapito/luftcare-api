import User from '@/entities/User';
import { hashPassword } from '@/services/AuthService';
import { createUser, findUserByEmail } from '@/services/UserService';
import CreateUserInput from '@/graphql/types/args/mutation/user/CreateUser';

const USER_ALREADY_EXISTS_ERROR = 'Já existe um usuário com esse email';

export default async function (userData: CreateUserInput): Promise<User> {
  const existingUserWithEmail = await findUserByEmail(userData.email);
  if (existingUserWithEmail) throw new Error(USER_ALREADY_EXISTS_ERROR);

  const passwordHash = await hashPassword(userData.password);
  return createUser({ ...userData, passwordHash });
}
