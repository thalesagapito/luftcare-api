import {
  Arg,
  Query,
  Mutation,
  Resolver,
} from 'type-graphql';
import {
  signAuthorizationToken,
} from '@/services/AuthService';
import TokenSet from '@/entities/TokenSet';
import LoginInput from '@/input-types/auth/Login';
import getUserFromTokenIfValid from '@/use-cases/auth/getUserFromTokenIfValid';
import getTokenSetFromLoginData from '@/use-cases/auth/getTokenSetFromLoginData';

@Resolver()
export default class AuthResolver {
  @Query(() => String)
  async authorizationToken(@Arg('refreshToken') refreshToken: string): Promise<string> {
    const userFromRefreshToken = await getUserFromTokenIfValid(refreshToken);
    if (!userFromRefreshToken) throw new Error('user from token not found');
    const newAuthorizationToken = signAuthorizationToken(userFromRefreshToken);

    return newAuthorizationToken;
  }

  @Mutation(() => TokenSet)
  async login(@Arg('loginData') loginData: LoginInput): Promise<TokenSet> {
    const { email, password } = loginData;

    return getTokenSetFromLoginData(email, password);
  }
}
