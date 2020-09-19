import { getCustomRepository } from 'typeorm';
import User from '@/entities/User';
import { hashPassword } from '@/services/AuthService';
import UserRepository from '@/repositories/UserRepository';

const USER_NOT_FOUND_ERROR = 'Nenhum usuário foi encontrado com o id recebido';

type Args = {
  id: User['id'];
  name?: string;
  phoneNumber?: string;
  password?: string;
};

export default async function (args: Args): Promise<User> {
  const { id: userId } = args;
  const userRepository = getCustomRepository(UserRepository);

  const currentUser = await userRepository.findUserById(userId);

  if (!currentUser) throw new Error(USER_NOT_FOUND_ERROR);

  const { name, phoneNumber, password } = args;


  if (name !== undefined) currentUser.name = name;
  if (phoneNumber !== undefined) currentUser.phoneNumber = phoneNumber;
  if (password !== undefined) currentUser.passwordHash = await hashPassword(password);

  return currentUser.save();
}
