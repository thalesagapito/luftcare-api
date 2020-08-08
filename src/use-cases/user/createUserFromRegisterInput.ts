import RegisterUserInput from '@/graphql/types/args/mutation/user/RegisterUser';
import { hashPassword } from '@/services/AuthService';
import { createUser, findUserByEmail } from '@/services/UserService';
import User from '@/entities/User';

const USER_ALREADY_EXISTS_ERROR = 'Já existe um usuário com esse email';

export default async function (userData: RegisterUserInput): Promise<User> {
  const existingUserWithEmail = await findUserByEmail(userData.email);
  if (existingUserWithEmail) throw new Error(USER_ALREADY_EXISTS_ERROR);

  const passwordHash = await hashPassword(userData.password);
  return createUser({ ...userData, passwordHash });
}
