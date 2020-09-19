import {
  Ctx,
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
import { GraphqlContext } from '@/server';
import ResponseScore from '@/entities/ResponseScore';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import canUserDoActionOnOtherUser from '@/use-cases/user/canUserDoActionOnOtherUser';
import calculateResponseScore from '@/use-cases/symptom-questionnaire-response/calculateResponseScore';
import createSymptomQuestionnaireResponse from '@/use-cases/symptom-questionnaire-response/createSymptomQuestionnaireResponse';
import SymptomQuestionnaireResponsesArgs from '@/graphql/types/args/query/symptom-questionnaire-response/SymptomQuestionnaireResponsesArgs';
import getPaginatedSymptomQuestionnaireResponses from '@/use-cases/symptom-questionnaire-response/getPaginatedSymptomQuestionnaireResponses';
import SymptomQuestionnaireResponseInput from '@/graphql/types/args/mutation/symptom-questionnaire-response/SymptomQuestionnaireResponseInput';
import PaginatedSymptomQuestionnaireResponses from '@/graphql/types/responses/symptom-questionnaire-response/PaginatedSymptomQuestionnaireResponses';

const NO_PERMISSION = 'Essa conta não tem permissão para realizar essa ação';

@Resolver(() => SymptomQuestionnaireResponse)
export default class SymptomQuestionnaireResponseResolver {
  @Authorized()
  @Mutation(() => SymptomQuestionnaireResponse)
  async createSymptomQuestionnaireResponse(@Ctx() ctx: GraphqlContext, @Arg('response') response: SymptomQuestionnaireResponseInput): Promise<SymptomQuestionnaireResponse> {
    const { user } = ctx;
    if (!user) throw new Error(NO_PERMISSION);

    const isUserRequestingToCreateForOtherUser = user.id !== response.userId;
    if (isUserRequestingToCreateForOtherUser) throw new Error(NO_PERMISSION);
    return createSymptomQuestionnaireResponse(response);
  }

  @Authorized()
  @Query(() => PaginatedSymptomQuestionnaireResponses)
  async symptomQuestionnaireResponses(@Ctx() ctx: GraphqlContext, @Args() args: SymptomQuestionnaireResponsesArgs): Promise<PaginatedSymptomQuestionnaireResponses> {
    const { user } = ctx;
    if (!user) throw new Error(NO_PERMISSION);

    const canUserDoAction = canUserDoActionOnOtherUser({
      rolesThatBypassVerification: [UserRole.DOCTOR, UserRole.ADMIN],
      otherUserId: args.userId || '',
      user,
    });

    if (!canUserDoAction) throw new Error(NO_PERMISSION);

    const { pageNumber, resultsPerPage, orderBy = [] } = args;
    const pagination = { pageNumber, resultsPerPage };

    const where = {
      userId: args.userId,
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
