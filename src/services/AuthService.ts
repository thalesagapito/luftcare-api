import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import TokenSet from '@/entities/TokenSet';
import { Nullable } from '@/helper-types';
import User from '@/entities/User';

type AuthToken = {
  id: string;
  iat: number;
  exp: number;
};

const signToken = (id: string, expiresIn: string): string => sign({ id }, process.env.JWT_SECRET, { expiresIn });
const verifyToken = (token: string): Nullable<AuthToken> => verify(token, process.env.JWT_SECRET) as AuthToken;

export const extractTokenWithoutBearerPrefix = (token: string): string => token.replace('Bearer ', '');

export const signAuthorizationToken = ({ id }: User): string => signToken(id, '15d');

export const signRefreshToken = ({ id }: User): string => signToken(id, '15d');

export const hashPassword = async (password: string): Promise<string> => hash(password, 12);

export const comparePasswordWithHash = async (password: string, hashedPassword: string): Promise<boolean> => compare(password, hashedPassword);

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
