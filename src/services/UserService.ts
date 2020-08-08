import { NullablePromise } from '@/helper-types';
import UserFields from '@/interfaces/UserFields';
import User, { uniqueFieldFromUser } from '@/entities/User';

async function findByUniqueFieldValue(field: uniqueFieldFromUser, value: string): NullablePromise<User> {
  return User.findOne({ [field]: value });
}

export async function findUserById(id: string) {
  return findByUniqueFieldValue('id', id);
}

export async function findUserByEmail(email: string) {
  return findByUniqueFieldValue('email', email);
}

export async function createUser(data: Partial<UserFields>): Promise<User> {
  return User.create(data).save();
}
