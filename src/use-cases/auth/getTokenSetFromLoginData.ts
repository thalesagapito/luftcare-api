import { compare } from 'bcryptjs';
import TokenSet from '@/entities/TokenSet';
import { signTokenSet } from '@/services/AuthService';
import { findUserByEmail } from '@/services/UserService';

const USER_NOT_FOUND_ERROR = 'Usuário não encontrado';
const INCORRECT_PASSWORD_ERROR = 'Senha incorreta';

export default async function (email: string, password: string): Promise<TokenSet> {
  const existingUser = await findUserByEmail(email);
  if (!existingUser) throw new Error(USER_NOT_FOUND_ERROR);

  const passwordsMatch = await compare(password, existingUser.passwordHash);
  if (!passwordsMatch) throw new Error(INCORRECT_PASSWORD_ERROR);

  const tokenSet = signTokenSet(existingUser);
  return tokenSet;
}
