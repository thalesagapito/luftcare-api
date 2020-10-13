import {
  ID,
  Ctx,
  Arg,
  Args,
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
import updateUser from '@/use-cases/user/updateUser';
import { comparePasswordWithHash } from '@/services/AuthService';
import UsersArgs from '@/graphql/types/args/query/user/UsersArgs';
import getPaginatedUsers from '@/use-cases/user/getPaginatedUsers';
import PaginatedUsers from '@/graphql/types/responses/user/PaginatedUsers';
import CreateUserInput from '@/graphql/types/args/mutation/user/CreateUser';
import RegisterUserInput from '@/graphql/types/args/mutation/user/RegisterUser';
import GenericResponse from '@/graphql/types/responses/reusable/GenericResponse';
import changeUserLoginCapability from '@/use-cases/user/changeUserLoginCapability';
import UpdatePasswordInput from '@/graphql/types/args/mutation/user/UpdatePassword';
import createUserFromRegisterInput from '@/use-cases/user/createUserFromRegisterInput';
import createUserFromAdminManualInput from '@/use-cases/user/createUserFromAdminManualInput';
import ChangeLoginCapabilityInput from '@/graphql/types/args/mutation/user/ChangeLoginCapability';

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: GraphqlContext): NullablePromise<User> {
    if (!ctx?.user?.id) return undefined;
    return getUser(ctx.user.id);
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async user(@Ctx() ctx: GraphqlContext, @Arg('id', () => ID) id: string): NullablePromise<User> {
    const NO_PERMISSION = 'Essa conta não tem permissão para realizar essa ação';

    const { user } = ctx;
    const isUserPatient = user?.role === UserRole.PATIENT;
    const isUserRequestingToSeeOtherUser = user?.id !== id;
    if (isUserPatient && isUserRequestingToSeeOtherUser) throw new Error(NO_PERMISSION);

    return getUser(id);
  }

  @Authorized([UserRole.ADMIN, UserRole.DOCTOR])
  @Query(() => PaginatedUsers)
  async users(@Args() args: UsersArgs): NullablePromise<PaginatedUsers> {
    const {
      role,
      name,
      email,
      phoneNumber,
      withDeleted,
      pageNumber,
      resultsPerPage,
      orderBy = [],
    } = args;
    const pagination = { pageNumber, resultsPerPage };
    const where = {
      role,
      name,
      email,
      phoneNumber,
      withDeleted,
    };

    return getPaginatedUsers({ where, orderBy, pagination });
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

  @Authorized()
  @Mutation(() => User)
  async updatePassword(@Ctx() ctx: GraphqlContext, @Args() { currentPassword, newPassword }: UpdatePasswordInput) {
    const { user } = ctx;
    const passwordsMatch = await comparePasswordWithHash(currentPassword, user?.passwordHash || '');

    const INCORRECT_PASSWORD_ERROR = 'Senha atual incorreta';
    if (!passwordsMatch) throw new Error(INCORRECT_PASSWORD_ERROR);

    return updateUser({ id: user?.id || '', password: newPassword });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async changeLoginCapability(@Args() { id, canLogin }: ChangeLoginCapabilityInput): Promise<GenericResponse> {
    return changeUserLoginCapability({ id, canLogin });
  }
}
