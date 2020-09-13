import { getCustomRepository } from 'typeorm';
import User from '@/entities/User';
import { NullablePromise } from '@/helper-types';
import UserRepository from '@/repositories/UserRepository';
import { extractTokenWithoutBearerPrefix, decodeIdFromToken } from '@/services/AuthService';

export default async function (token: string): NullablePromise<User> {
  const userRepository = getCustomRepository(UserRepository);

  const tokenWithoutBearerPrefix = extractTokenWithoutBearerPrefix(token);
  const userId = decodeIdFromToken(tokenWithoutBearerPrefix);
  if (!userId) return undefined;
  return userRepository.findUserById(userId);
}
