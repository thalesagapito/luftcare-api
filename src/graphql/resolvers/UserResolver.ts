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
import getUser from '@/use-cases/user/getUser';
import { NullablePromise } from '@/helper-types';
import CreateUserInput from '@/graphql/types/args/mutation/user/CreateUser';
import RegisterUserInput from '@/graphql/types/args/mutation/user/RegisterUser';
import createUserFromRegisterInput from '@/use-cases/user/createUserFromRegisterInput';
import createUserFromAdminManualInput from '@/use-cases/user/createUserFromAdminManualInput';

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: GraphqlContext): NullablePromise<User> {
    if (!ctx?.user?.id) return undefined;
    return getUser(ctx.user.id);
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => ID) id: string): NullablePromise<User> {
    return getUser(id);
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

  @Authorized(UserRole.ADMIN)
  @Mutation(() => User)
  async createUser(@Arg('userData') userData: CreateUserInput): Promise<User> {
    return createUserFromAdminManualInput(userData);
  }
  // TODO change password method
}
