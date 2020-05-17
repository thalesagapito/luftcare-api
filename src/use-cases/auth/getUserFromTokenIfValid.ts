import { extractTokenWithoutBearerPrefix, decodeIdFromToken } from '@/services/AuthService';
import { getUserById } from '@/services/UserService';
import { NullablePromise } from '@/types/Helpers';
import User from '@/entities/User';

export default async function (token: string): NullablePromise<User> {
  const tokenWithoutBearerPrefix = extractTokenWithoutBearerPrefix(token);
  const userId = decodeIdFromToken(tokenWithoutBearerPrefix);
  const user = getUserById(userId);
  return user;
}
