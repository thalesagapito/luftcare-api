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
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import GenericResponse from '@/graphql/types/responses/reusable/GenericResponse';
import getSymptomQuestionnaireById from '@/use-cases/symptom-questionnaire/getSymptomQuestionnaireById';
import deleteSymptomQuestionnaireById from '@/use-cases/symptom-questionnaire/deleteSymptomQuestionnaireById';
import createSymptomQuestionnaireVersion from '@/use-cases/symptom-questionnaire/createSymptomQuestionnaireVersion';
import SymptomQuestionnairesArgs from '@/graphql/types/args/query/symptom-questionnaire/SymptomQuestionnairesArgs';
import getPaginatedSymptomQuestionnaires from '@/use-cases/symptom-questionnaire/getPaginatedSymptomQuestionnaires';
import SymptomQuestionnaireInput from '@/graphql/types/args/mutation/symptom-questionnaire/SymptomQuestionnaireInput';
import PaginatedSymptomQuestionnaires from '@/graphql/types/responses/symptom-questionnaire/PaginatedSymptomQuestionnaires';
import UpdateSymptomQuestionnaireArgs from '@/graphql/types/args/mutation/symptom-questionnaire/UpdateSymptomQuestionnaireArgs';
import createSymptomQuestionnaireInitialVersion from '@/use-cases/symptom-questionnaire/createSymptomQuestionnaireInitialVersion';
import updateSymptomQuestionnairePublishStatus from '@/use-cases/symptom-questionnaire/updateSymptomQuestionnairePublishStatus';

@Resolver(() => SymptomQuestionnaire)
export default class SymptomQuestionnaireResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomQuestionnaire)
  async createSymptomQuestionnaire(@Arg('questionnaire') questionnaire: SymptomQuestionnaireInput): Promise<SymptomQuestionnaire> {
    return createSymptomQuestionnaireInitialVersion(SymptomQuestionnaire.create(questionnaire));
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomQuestionnaire)
  async updateSymptomQuestionnaire(@Args() { id, questionnaire }: UpdateSymptomQuestionnaireArgs): Promise<SymptomQuestionnaire> {
    return createSymptomQuestionnaireVersion(id, SymptomQuestionnaire.create(questionnaire));
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async publishSymptomQuestionnaire(@Arg('id', () => ID) id: string): Promise<GenericResponse> {
    return updateSymptomQuestionnairePublishStatus(id, true);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async unpublishSymptomQuestionnaire(@Arg('id', () => ID) id: string): Promise<GenericResponse> {
    return updateSymptomQuestionnairePublishStatus(id, false);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async changeSymptomQuestionnairePublishStatus(@Arg('id', () => ID) id: string, @Arg('isPublished') isPublished: boolean): Promise<GenericResponse> {
    return updateSymptomQuestionnairePublishStatus(id, isPublished);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async deleteSymptomQuestionnaire(@Arg('id', () => ID) id: string): Promise<GenericResponse> {
    return deleteSymptomQuestionnaireById(id);
  }

  @Authorized()
  @Query(() => PaginatedSymptomQuestionnaires)
  async symptomQuestionnaires(@Args() args: SymptomQuestionnairesArgs): Promise<PaginatedSymptomQuestionnaires> {
    const { pageNumber, resultsPerPage, orderBy = [] } = args;
    const pagination = { pageNumber, resultsPerPage };

    const where = {
      currentVersionsOnly: args.currentVersionsOnly,
      nameForManagement: args.nameForManagement,
      isPublished: args.isPublished,
      withDeleted: args.withDeleted,
    };

    return getPaginatedSymptomQuestionnaires({ pagination, where, orderBy });
  }

  @Authorized()
  @Query(() => SymptomQuestionnaire)
  async symptomQuestionnaire(@Arg('id', () => ID) id: string): NullablePromise<SymptomQuestionnaire> {
    return getSymptomQuestionnaireById(id);
  }
}
