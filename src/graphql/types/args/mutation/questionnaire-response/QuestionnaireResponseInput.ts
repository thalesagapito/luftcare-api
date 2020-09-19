import {
  Field, InputType, ID, Int,
} from 'type-graphql';
import {
  IsNotEmpty,
  IsDate,
  IsUUID,
  IsInt,
  Min,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import QuestionnaireResponseAnswerInput from './QuestionnaireResponseAnswerInput';

@InputType()
export default class QuestionnaireResponseInput {
  @Field({ description: 'DateTime in ISO-8601 format: 2020-12-31T23:59:59+0300' })
  @IsDate()
  @IsNotEmpty({ message: 'A resolução do questionário deve ter uma data associada' })
  responseDate: Date;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty({ message: 'A resolução do questionário deve especificar o identificador do usuário que responde' })
  userId: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty({ message: 'A resolução do questionário deve especificar o identificador do questionário referido' })
  questionnaireId: string;

  @Field(() => Int)
  @Min(1)
  @IsInt()
  @IsNotEmpty({ message: 'A resolução do questionário deve especificar a versão do questionário referido' })
  questionnaireVersion: number;

  @Field(() => [QuestionnaireResponseAnswerInput])
  @ArrayNotEmpty({ message: 'A resolução do questionário deve ter no mínimo uma resposta' })
  @ValidateNested()
  questionAnswers: QuestionnaireResponseAnswerInput[];
}
