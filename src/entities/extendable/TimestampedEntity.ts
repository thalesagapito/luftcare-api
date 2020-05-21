import { ID, Field as GraphqlField, ObjectType as GraphqlType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@GraphqlType({ isAbstract: true })
export default class TimestampedEntity extends BaseEntity {
  @GraphqlField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @GraphqlField()
  @CreateDateColumn()
  createdAt: Date;

  @GraphqlField()
  @UpdateDateColumn()
  updatedAt: Date;

  @GraphqlField({ nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
