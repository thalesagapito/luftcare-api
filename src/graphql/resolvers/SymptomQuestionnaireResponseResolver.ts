import {
  Arg,
  Args,
  Root,
  Query,
  Mutation,
  Resolver,
  Authorized,
  FieldResolver,
} from 'type-graphql';
import { UserRole } from '@/enums';
import ResponseScore from '@/entities/ResponseScore';
import GenericResponse from '@/graphql/types/responses/reusable/GenericResponse';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import calculateResponseScore from '@/use-cases/symptom-questionnaire-response/calculateResponseScore';
import createSymptomQuestionnaireResponse from '@/use-cases/symptom-questionnaire-response/createSymptomQuestionnaireResponse';
import SymptomQuestionnaireResponsesArgs from '@/graphql/types/args/query/symptom-questionnaire-response/SymptomQuestionnaireResponsesArgs';
import getPaginatedSymptomQuestionnaireResponses from '@/use-cases/symptom-questionnaire-response/getPaginatedSymptomQuestionnaireResponses';
import SymptomQuestionnaireResponseInput from '@/graphql/types/args/mutation/symptom-questionnaire-response/SymptomQuestionnaireResponseInput';
import PaginatedSymptomQuestionnaireResponses from '@/graphql/types/responses/symptom-questionnaire-response/PaginatedSymptomQuestionnaireResponses';

@Resolver(() => SymptomQuestionnaireResponse)
export default class SymptomQuestionnaireResponseResolver {
  @Authorized()
  @Mutation(() => GenericResponse)
  async createSymptomQuestionnaireResponse(@Arg('response') response: SymptomQuestionnaireResponseInput): Promise<GenericResponse> {
    // TODO add verification to make sure only the logged user can submit responses
    await createSymptomQuestionnaireResponse(response);

    return { userFriendlyMessage: 'Resposta enviada com sucesso' };
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => PaginatedSymptomQuestionnaireResponses)
  async symptomQuestionnaireResponses(@Args() args: SymptomQuestionnaireResponsesArgs): Promise<PaginatedSymptomQuestionnaireResponses> {
    const { pageNumber, resultsPerPage, orderBy = [] } = args;
    const pagination = { pageNumber, resultsPerPage };

    const where = {
      patientId: args.patientId,
      withDeleted: args.withDeleted,
      responseDateAfter: args.responseDateAfter,
      responseDateBefore: args.responseDateBefore,
    };
    return getPaginatedSymptomQuestionnaireResponses({ pagination, orderBy, where });
  }

  @FieldResolver(() => ResponseScore)
  score(@Root() response: SymptomQuestionnaireResponse): ResponseScore {
    return calculateResponseScore(response);
  }
}
