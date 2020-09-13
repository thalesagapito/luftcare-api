import {
  Repository,
  ObjectLiteral,
  EntityRepository,
  OrderByCondition,
} from 'typeorm';
import { NullablePromise } from '@/helper-types';
import UserFields from '@/interfaces/UserFields';
import User, { uniqueFieldFromUser } from '@/entities/User';
import { ORMPagination } from '@/services/PaginationService';
import { applyPrefixToOrderByCondition } from '@/services/OrderByService';

export type FindAndCountUsersArgs = {
  pagination?: ORMPagination;
  withDeleted?: boolean;
  orderBy?: OrderByCondition;
  where?: ObjectLiteral;
};

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

  public async findAndCountUsers(args: FindAndCountUsersArgs): Promise<[User[], number]> {
    const {
      where,
      orderBy,
      pagination,
      withDeleted,
    } = args;

    let query = this.createQueryBuilder('u');

    if (pagination?.skip) query = query.skip(pagination?.skip);
    if (pagination?.take) query = query.take(pagination?.take);
    if (withDeleted) query = query.withDeleted();
    if (orderBy) query = query.orderBy(applyPrefixToOrderByCondition(orderBy, 'u.'));
    if (where) query = query.where(where);

    const [results, count] = await query.getManyAndCount();
    return [results, count];
  }
}
