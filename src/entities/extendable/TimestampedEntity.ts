import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field as GraphqlField, ObjectType as GraphqlType } from 'type-graphql';

@GraphqlType({ isAbstract: true })
export default class TimestampedEntity extends BaseEntity {
  @GraphqlField()
  @CreateDateColumn()
  createdAt: Date;

  @GraphqlField()
  @UpdateDateColumn()
  updatedAt: Date;
}
