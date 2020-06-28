import { NullablePromise } from '@/helper-types';
import UserFields from '@/interfaces/UserFields';
import User, { uniqueFieldFromUser } from '@/entities/User';

async function getByUniqueFieldValue(field: uniqueFieldFromUser, value: string): NullablePromise<User> {
  return User.findOne({ [field]: value });
}

export async function getUserById(id: string) {
  return getByUniqueFieldValue('id', id);
}

export async function getUserByEmail(email: string) {
  return getByUniqueFieldValue('email', email);
}

export async function createUser(data: Partial<UserFields>): Promise<User> {
  return User.create(data).save();
}
