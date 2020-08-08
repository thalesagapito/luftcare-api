import {
  ID,
  Arg,
  Ctx,
  Query,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import User from '@/entities/User';
import { UserRole } from '@/enums';
import { GraphqlContext } from '@/server';
import { NullablePromise } from '@/helper-types';
import { findUserById } from '@/services/UserService';
import RegisterUserInput from '@/graphql/types/args/mutation/user/RegisterUser';
import createUserFromRegisterInput from '@/use-cases/user/createUserFromRegisterInput';

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: GraphqlContext): NullablePromise<User> {
    if (!ctx?.user?.id) return undefined;
    return findUserById(ctx.user.id);
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => ID) id: string): NullablePromise<User> {
    return findUserById(id);
  }

  // @Authorized()
  @Query(() => [User], { nullable: true })
  async users(): NullablePromise<User[]> {
    // TODO
    return undefined;
  }

  @Mutation(() => User)
  async registerUser(@Arg('userData') userData: RegisterUserInput): Promise<User> {
    return createUserFromRegisterInput(userData);
  }
  // TODO change password method
}
