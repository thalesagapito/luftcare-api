import { Field as GraphqlField, ObjectType as GraphqlType } from 'type-graphql';
import { Entity as DatabaseTable, Column as DatabaseColumn } from 'typeorm';
import { UserRole } from '@/enums';
import UserFields from '@/interfaces/UserFields';
import TimestampedEntity from '@/entities/extendable/TimestampedEntity';

export type uniqueFieldFromUser = keyof Pick<User, 'id' | 'email' | 'phoneNumber'>;

@GraphqlType()
@DatabaseTable()
export default class User extends TimestampedEntity implements UserFields {
  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 255 })
  name: string;

  @GraphqlField({ description: 'Unique email address used for logging in' })
  @DatabaseColumn({ type: 'varchar', length: 255, unique: true })
  email: string;

  @GraphqlField({ description: 'Has to contain special characters: +55 (41) 98765-4321' })
  @DatabaseColumn({ type: 'varchar', length: 20, unique: true })
  phoneNumber: string;

  @DatabaseColumn({ type: 'varchar', length: 500 })
  passwordHash: string;

  @GraphqlField(() => UserRole)
  @DatabaseColumn({ type: 'enum', enum: UserRole, default: UserRole.NON_ADMIN })
  role: UserRole;
}
