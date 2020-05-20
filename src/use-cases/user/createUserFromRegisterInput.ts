import RegisterUserInput from '@/graphql/types/args/mutation/user/RegisterUser';
import { hashPassword } from '@/services/AuthService';
import User from '@/entities/User';

export default async function (userData: RegisterUserInput): Promise<User> {
  const passwordHash = await hashPassword(userData.password);
  const createdUser = await User.create({ ...userData, passwordHash }).save();

  return createdUser;
}
