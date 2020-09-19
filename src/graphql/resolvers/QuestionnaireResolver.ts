import {
  ID,
  Arg,
  Args,
  Query,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import { UserRole } from '@/enums';
import { NullablePromise } from '@/helper-types';
import Questionnaire from '@/entities/Questionnaire';
import GenericResponse from '@/graphql/types/responses/reusable/GenericResponse';
import getQuestionnaireById from '@/use-cases/questionnaire/getQuestionnaireById';
import deleteQuestionnaireById from '@/use-cases/questionnaire/deleteQuestionnaireById';
import createQuestionnaireVersion from '@/use-cases/questionnaire/createQuestionnaireVersion';
import QuestionnairesArgs from '@/graphql/types/args/query/questionnaire/QuestionnairesArgs';
import getPaginatedQuestionnaires from '@/use-cases/questionnaire/getPaginatedQuestionnaires';
import QuestionnaireInput from '@/graphql/types/args/mutation/questionnaire/QuestionnaireInput';
import PaginatedQuestionnaires from '@/graphql/types/responses/questionnaire/PaginatedQuestionnaires';
import UpdateQuestionnaireArgs from '@/graphql/types/args/mutation/questionnaire/UpdateQuestionnaireArgs';
import createQuestionnaireInitialVersion from '@/use-cases/questionnaire/createQuestionnaireInitialVersion';
import updateQuestionnairePublishStatus from '@/use-cases/questionnaire/updateQuestionnairePublishStatus';

@Resolver(() => Questionnaire)
export default class QuestionnaireResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => Questionnaire)
  async createQuestionnaire(@Arg('questionnaire') questionnaire: QuestionnaireInput): Promise<Questionnaire> {
    return createQuestionnaireInitialVersion(Questionnaire.create(questionnaire));
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Questionnaire)
  async updateQuestionnaire(@Args() { id, questionnaire }: UpdateQuestionnaireArgs): Promise<Questionnaire> {
    return createQuestionnaireVersion(id, Questionnaire.create(questionnaire));
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async publishQuestionnaire(@Arg('id', () => ID) id: string): Promise<GenericResponse> {
    return updateQuestionnairePublishStatus(id, true);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async unpublishQuestionnaire(@Arg('id', () => ID) id: string): Promise<GenericResponse> {
    return updateQuestionnairePublishStatus(id, false);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async changeQuestionnairePublishStatus(@Arg('id', () => ID) id: string, @Arg('isPublished') isPublished: boolean): Promise<GenericResponse> {
    return updateQuestionnairePublishStatus(id, isPublished);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async deleteQuestionnaire(@Arg('id', () => ID) id: string): Promise<GenericResponse> {
    return deleteQuestionnaireById(id);
  }

  @Authorized()
  @Query(() => PaginatedQuestionnaires)
  async questionnaires(@Args() args: QuestionnairesArgs): Promise<PaginatedQuestionnaires> {
    const { pageNumber, resultsPerPage, orderBy = [] } = args;
    const pagination = { pageNumber, resultsPerPage };

    const where = {
      currentVersionsOnly: args.currentVersionsOnly,
      nameForManagement: args.nameForManagement,
      isPublished: args.isPublished,
      withDeleted: args.withDeleted,
    };

    return getPaginatedQuestionnaires({ pagination, where, orderBy });
  }

  @Authorized()
  @Query(() => Questionnaire)
  async questionnaire(@Arg('id', () => ID) id: string): NullablePromise<Questionnaire> {
    return getQuestionnaireById(id);
  }
}
