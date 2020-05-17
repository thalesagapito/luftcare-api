import User from '@/entities/User';
import { sign, verify } from 'jsonwebtoken';
import TokenSet from '@/entities/TokenSet';
import { Nullable } from '@/types/Helpers';
import { hash } from 'bcryptjs';

type AuthToken = {
  id: string;
  iat: number;
  exp: number;
};

const signToken = (id: string, expiresIn: string): string => sign({ id }, process.env.JWT_SECRET, { expiresIn });
const verifyToken = (token: string): Nullable<AuthToken> => verify(token, process.env.JWT_SECRET) as AuthToken;

export const extractTokenWithoutBearerPrefix = (token: string): string => token.replace('Bearer ', '');

export const signAuthorizationToken = ({ id }: User): string => signToken(id, '15m');

export const signRefreshToken = ({ id }: User): string => signToken(id, '15d');

export const hashPassword = async (password: string): Promise<string> => hash(password, 12);

export function signTokenSet(user: User): TokenSet {
  const authorization = signAuthorizationToken(user);
  const refresh = signRefreshToken(user);
  return { authorization, refresh };
}

export function decodeIdFromToken(token: string): Nullable<string> {
  try {
    const idFromToken = verifyToken(token);
    return idFromToken?.id;
  } catch {
    return undefined;
  }
}

// TODO mobile refresh token with 30 days expiration?
