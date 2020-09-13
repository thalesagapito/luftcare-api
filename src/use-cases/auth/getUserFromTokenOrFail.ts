import { getCustomRepository } from 'typeorm';
import User from '@/entities/User';
import UserRepository from '@/repositories/UserRepository';
import { extractTokenWithoutBearerPrefix, decodeIdFromToken } from '@/services/AuthService';

const USER_ID_NOT_FOUND_IN_TOKEN = 'Nenhum id válido de usuário foi encontrado no token';
const USER_NOT_FOUND = 'Nenhum usuário com o id do token foi encontrado';

export default async function (token: string): Promise<User> {
  const { findUserById } = getCustomRepository(UserRepository);
  const tokenWithoutBearerPrefix = extractTokenWithoutBearerPrefix(token);

  const userId = decodeIdFromToken(tokenWithoutBearerPrefix);
  if (!userId) throw new Error(USER_ID_NOT_FOUND_IN_TOKEN);

  const user = await findUserById(userId);
  if (!user) throw new Error(USER_NOT_FOUND);

  return user;
}
