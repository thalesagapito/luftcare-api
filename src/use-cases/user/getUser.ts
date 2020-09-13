import { getCustomRepository } from 'typeorm';
import User from '@/entities/User';
import { NullablePromise } from '@/helper-types';
import UserRepository from '@/repositories/UserRepository';

const USER_NOT_FOUND_ERROR = 'Usuário não encontrado';

export default async function (userId: string, shouldFailIfNotFound = false): NullablePromise<User> {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findUserById(userId);
  if (shouldFailIfNotFound && !user) throw new Error(USER_NOT_FOUND_ERROR);

  return user;
}
