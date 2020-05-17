import { ObjectType as GraphqlType, Field as GraphqlField } from 'type-graphql';
import TokenSetFields from '@/interfaces/TokenSetFields';

@GraphqlType()
export default class TokenSet implements TokenSetFields {
  @GraphqlField()
  authorization: string;

  @GraphqlField()
  refresh: string;
}
