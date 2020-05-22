import RegisterUserInput from '@/graphql/types/args/mutation/user/RegisterUser';
import { hashPassword } from '@/services/AuthService';
import { createUser } from '@/services/UserService';
import User from '@/entities/User';

export default async function (userData: RegisterUserInput): Promise<User> {
  const passwordHash = await hashPassword(userData.password);
  return createUser({ ...userData, passwordHash });
}
