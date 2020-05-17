import { compare } from 'bcryptjs';
import TokenSet from '@/entities/TokenSet';
import { signTokenSet } from '@/services/AuthService';
import { getUserByEmail } from '@/services/UserService';

export default async function (email: string, password: string): Promise<TokenSet> {
  const existingUser = await getUserByEmail(email);
  if (!existingUser) throw new Error('user not found');

  const passwordsMatch = await compare(password, existingUser.passwordHash);
  if (!passwordsMatch) throw new Error('incorrect password');

  const tokenSet = signTokenSet(existingUser);
  return tokenSet;
}
