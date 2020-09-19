import { getCustomRepository } from 'typeorm';
import TokenSet from '@/entities/TokenSet';
import UserRepository from '@/repositories/UserRepository';
import { comparePasswordWithHash, signTokenSet } from '@/services/AuthService';

const USER_NOT_FOUND_ERROR = 'Usuário não encontrado';
const INCORRECT_PASSWORD_ERROR = 'Senha incorreta';

export default async function (email: string, password: string): Promise<TokenSet> {
  const userRepository = getCustomRepository(UserRepository);

  const existingUser = await userRepository.findUserByEmail(email);
  if (!existingUser) throw new Error(USER_NOT_FOUND_ERROR);

  const passwordsMatch = await comparePasswordWithHash(password, existingUser.passwordHash);
  if (!passwordsMatch) throw new Error(INCORRECT_PASSWORD_ERROR);

  const tokenSet = signTokenSet(existingUser);
  return tokenSet;
}
