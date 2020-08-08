import { extractTokenWithoutBearerPrefix, decodeIdFromToken } from '@/services/AuthService';
import { findUserById } from '@/services/UserService';
import { NullablePromise } from '@/helper-types';
import User from '@/entities/User';

export default async function (token: string): NullablePromise<User> {
  const tokenWithoutBearerPrefix = extractTokenWithoutBearerPrefix(token);
  const userId = decodeIdFromToken(tokenWithoutBearerPrefix);
  if (!userId) return undefined;
  return findUserById(userId);
}
