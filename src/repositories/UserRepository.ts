import { EntityRepository, Repository } from 'typeorm';
import { NullablePromise } from '@/helper-types';
import UserFields from '@/interfaces/UserFields';
import User, { uniqueFieldFromUser } from '@/entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  private async findByUniqueFieldValue(field: uniqueFieldFromUser, value: string): NullablePromise<User> {
    return this.findOne({ [field]: value });
  }

  public async findUserById(id: string): NullablePromise<User> {
    return this.findByUniqueFieldValue('id', id);
  }

  public async findUserByEmail(email: string): NullablePromise<User> {
    return this.findByUniqueFieldValue('email', email);
  }

  public async createUser(data: Partial<UserFields>): Promise<User> {
    return this.create(data).save();
  }

  // async getUsers(): Promise<User[]> {
  //   return
  // }
}
