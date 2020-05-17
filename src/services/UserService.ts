import { NullablePromise } from '@/types/Helpers';
import User, { uniqueFieldFromUser } from '@/entities/User';

async function getByUniqueFieldValue(field: uniqueFieldFromUser, value: string): NullablePromise<User> {
  return User.findOne({ [field]: value });
}

export async function getUserById(id?: string): ReturnType<typeof getByUniqueFieldValue> {
  if (!id) return undefined;
  return getByUniqueFieldValue('id', id);
}

export async function getUserByEmail(email?: string): ReturnType<typeof getByUniqueFieldValue> {
  if (!email) return undefined;
  return getByUniqueFieldValue('email', email);
}
