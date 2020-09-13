import { getCustomRepository } from 'typeorm';
import User from '@/entities/User';
import { hashPassword } from '@/services/AuthService';
import UserRepository from '@/repositories/UserRepository';
import CreateUserInput from '@/graphql/types/args/mutation/user/CreateUser';

const USER_ALREADY_EXISTS_ERROR = 'Já existe um usuário com esse email';

export default async function (userData: CreateUserInput): Promise<User> {
  const userRepository = getCustomRepository(UserRepository);

  const existingUserWithEmail = await userRepository.findUserByEmail(userData.email);
  if (existingUserWithEmail) throw new Error(USER_ALREADY_EXISTS_ERROR);

  const passwordHash = await hashPassword(userData.password);
  return userRepository.createUser({ ...userData, passwordHash });
}
