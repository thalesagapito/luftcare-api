import { ID, Field as GraphqlField, ObjectType as GraphqlType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import UserFields from '@/interfaces/UserFields';
import { UserRole } from '@/enums';

export type uniqueFieldFromUser = keyof Pick<User, 'id' | 'email' | 'phoneNumber'>;

@GraphqlType()
@DatabaseTable()
export default class User extends BaseEntity implements UserFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField()
  @CreateDateColumn()
  createdAt: Date;

  @GraphqlField()
  @UpdateDateColumn()
  updatedAt: Date;

  @GraphqlField()
  @DeleteDateColumn()
  deletedAt: Date;

  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 255 })
  name: string;

  @GraphqlField({ description: 'Unique email address used for logging in' })
  @DatabaseColumn({ type: 'varchar', length: 255, unique: true })
  email: string;

  @GraphqlField({ description: 'Unique phone number used for logging in. Only numbers, no special characters' })
  @DatabaseColumn({ type: 'varchar', length: 20, unique: true })
  phoneNumber: string;

  @DatabaseColumn({ type: 'varchar', length: 500 })
  passwordHash: string;

  @GraphqlField(() => UserRole)
  @DatabaseColumn({ type: 'enum', enum: UserRole, default: UserRole.NON_ADMIN })
  role: UserRole;
}
