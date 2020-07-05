import {
  Field as GraphqlField,
  ObjectType as GraphqlType,
} from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@GraphqlType({ isAbstract: true })
export default class SoftRemovableTimestampedEntity extends BaseEntity {
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
