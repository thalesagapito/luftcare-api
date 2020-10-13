import { getCustomRepository } from 'typeorm';
import User from '@/entities/User';
import UserRepository from '@/repositories/UserRepository';
import GenericResponse from '@/graphql/types/responses/reusable/GenericResponse';

const ADD_CAPABILITY_SUCESS_MESSAGE = 'Permissão de usar a aplicação adicionada com sucesso';
const REMOVE_CAPABILITY_SUCESS_MESSAGE = 'Permissão de usar a aplicação removida com sucesso';
const USER_NOT_FOUND_ERROR = 'Nenhum usuário foi encontrado com o id recebido';
const USER_ALREADY_HAS_LOGIN_CAPABILITY = 'O usuário já tem permissão para usar a aplicação';
const USER_ALREADY_DOESNT_HAVE_LOGIN_CAPABILITY = 'O usuário já não tem permissão para usar a aplicação';

type Args = {
  id: User['id'];
  canLogin: User['canLogin'];
};

export default async function ({ id, canLogin }: Args): Promise<GenericResponse> {
  const userRepository = getCustomRepository(UserRepository);

  const userWithId = await userRepository.findUserById(id);

  if (!userWithId) throw new Error(USER_NOT_FOUND_ERROR);
  if (userWithId.canLogin === canLogin && canLogin) throw new Error(USER_ALREADY_HAS_LOGIN_CAPABILITY);
  if (userWithId.canLogin === canLogin && !canLogin) throw new Error(USER_ALREADY_DOESNT_HAVE_LOGIN_CAPABILITY);

  userWithId.canLogin = canLogin;
  await userRepository.save(userWithId);

  return {
    userFriendlyMessage: canLogin
      ? ADD_CAPABILITY_SUCESS_MESSAGE
      : REMOVE_CAPABILITY_SUCESS_MESSAGE,
  };
}
