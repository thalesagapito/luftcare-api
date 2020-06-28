import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Response padrão informativo para quando não se espera dados como resposta' })
export default class GenericResponse {
  @Field()
  userFriendlyMessage: string;
}
