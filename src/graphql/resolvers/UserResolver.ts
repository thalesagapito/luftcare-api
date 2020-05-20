import {
  Arg,
  Ctx,
  Query,
  Mutation,
  Resolver,
  // Authorized,
} from 'type-graphql';
import User from '@/entities/User';
import { GraphqlContext } from '@/server';
import { NullablePromise } from '@/helper-types';
import { getUserById, getUserByEmail } from '@/services/UserService';
import RegisterUserInput from '@/graphql/types/args/mutation/user/RegisterUser';
import createUserFromRegisterInput from '@/use-cases/user/createUserFromRegisterInput';

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: GraphqlContext): NullablePromise<User> {
    return getUserById(ctx?.user?.id);
  }

  // @Authorized()
  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): NullablePromise<User> {
    const user = await getUserById(id);
    return user;
  }

  // @Authorized()
  @Query(() => [User], { nullable: true })
  async users(): NullablePromise<User[]> {
    // TODO
    return undefined;
  }

  @Mutation(() => User)
  async registerUser(@Arg('userData') userData: RegisterUserInput): Promise<User> {
    const existingUserWithEmail = await getUserByEmail(userData.email);
    if (existingUserWithEmail) throw new Error('user with email already exists');

    return createUserFromRegisterInput(userData);
  }
}
