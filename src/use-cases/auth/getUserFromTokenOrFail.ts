import { extractTokenWithoutBearerPrefix, decodeIdFromToken } from '@/services/AuthService';
import { getUserById } from '@/services/UserService';
import User from '@/entities/User';

const USER_ID_NOT_FOUND_IN_TOKEN = 'Nenhum id válido de usuário foi encontrado no token';
const USER_NOT_FOUND = 'Nenhum usuário com o id do token foi encontrado';

export default async function (token: string): Promise<User> {
  const tokenWithoutBearerPrefix = extractTokenWithoutBearerPrefix(token);

  const userId = decodeIdFromToken(tokenWithoutBearerPrefix);
  if (!userId) throw new Error(USER_ID_NOT_FOUND_IN_TOKEN);

  const user = await getUserById(userId);
  if (!user) throw new Error(USER_NOT_FOUND);

  return user;
}
