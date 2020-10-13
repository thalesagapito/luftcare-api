/* eslint-disable global-require */
import {
  ID,
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  OneToMany,
  PrimaryGeneratedColumn,
  Entity as DatabaseTable,
  Column as DatabaseColumn,
} from 'typeorm';
import { UserRole } from '@/enums';
import UserFields from '@/interfaces/UserFields';
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';
import SoftRemovableTimestampedEntity from '@/entities/extendable/SoftRemovableTimestampedEntity';

export type uniqueFieldFromUser = keyof Pick<User, 'id' | 'email'>;

@GraphqlType()
@DatabaseTable()
export default class User extends SoftRemovableTimestampedEntity implements UserFields {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField()
  @DatabaseColumn({ type: 'varchar', length: 500 })
  name: string;

  @GraphqlField({ description: 'Unique email address used for logging in' })
  @DatabaseColumn({ type: 'varchar', length: 500, unique: true })
  email: string;

  @GraphqlField({ description: 'Should contain special characters, like: +55 (41) 98765-4321' })
  @DatabaseColumn({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @GraphqlField({ description: 'If the user is allowed to log in the application' })
  @DatabaseColumn({ type: 'boolean', default: true })
  canLogin: boolean;

  @DatabaseColumn({ type: 'varchar', length: 500 })
  passwordHash: string;

  @GraphqlField(() => UserRole)
  @DatabaseColumn({ type: 'enum', enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  // TODO check if this side of the relation is necessary
  // @GraphqlField(() => require('./QuestionnaireResponse').default)
  @OneToMany('QuestionnaireResponse', 'patient')
  questionnaireResponses: QuestionnaireResponse[];
}
