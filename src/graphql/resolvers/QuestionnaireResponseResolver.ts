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
import QuestionnaireResponse from '@/entities/QuestionnaireResponse';
import canUserDoActionOnOtherUser from '@/use-cases/user/canUserDoActionOnOtherUser';
import calculateResponseScore from '@/use-cases/questionnaire-response/calculateResponseScore';
import createQuestionnaireResponse from '@/use-cases/questionnaire-response/createQuestionnaireResponse';
import QuestionnaireResponsesArgs from '@/graphql/types/args/query/questionnaire-response/QuestionnaireResponsesArgs';
import getPaginatedQuestionnaireResponses from '@/use-cases/questionnaire-response/getPaginatedQuestionnaireResponses';
import QuestionnaireResponseInput from '@/graphql/types/args/mutation/questionnaire-response/QuestionnaireResponseInput';
import PaginatedQuestionnaireResponses from '@/graphql/types/responses/questionnaire-response/PaginatedQuestionnaireResponses';

const NO_PERMISSION = 'Essa conta não tem permissão para realizar essa ação';

@Resolver(() => QuestionnaireResponse)
export default class QuestionnaireResponseResolver {
  @Authorized()
  @Mutation(() => QuestionnaireResponse)
  async createQuestionnaireResponse(@Ctx() ctx: GraphqlContext, @Arg('response') response: QuestionnaireResponseInput): Promise<QuestionnaireResponse> {
    const { user } = ctx;
    if (!user) throw new Error(NO_PERMISSION);

    const isUserRequestingToCreateForOtherUser = user.id !== response.userId;
    if (isUserRequestingToCreateForOtherUser) throw new Error(NO_PERMISSION);
    return createQuestionnaireResponse(response);
  }

  @Authorized()
  @Query(() => PaginatedQuestionnaireResponses)
  async questionnaireResponses(@Ctx() ctx: GraphqlContext, @Args() args: QuestionnaireResponsesArgs): Promise<PaginatedQuestionnaireResponses> {
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
    return getPaginatedQuestionnaireResponses({ pagination, orderBy, where });
  }

  @FieldResolver(() => ResponseScore)
  score(@Root() response: QuestionnaireResponse): ResponseScore {
    return calculateResponseScore(response);
  }
}
