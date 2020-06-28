import {
  Arg,
  Args,
  Query,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import { UserRole } from '@/enums';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import GenericResponse from '@/graphql/types/responses/reusable/GenericResponse';
import createSymptomQuestionnaireVersion from '@/use-cases/symptom-questionnaire/createSymptomQuestionnaireVersion';
import SymptomQuestionnairesArgs from '@/graphql/types/args/query/symptom-questionnaire/SymptomQuestionnairesArgs';
import getPaginatedSymptomQuestionnaires from '@/use-cases/symptom-questionnaire/getPaginatedSymptomQuestionnaires';
import SymptomQuestionnaireInput from '@/graphql/types/args/mutation/symptom-questionnaire/SymptomQuestionnaireInput';
import UpdateSymptomQuestionnaireArgs from '@/graphql/types/args/mutation/symptom-questionnaire/UpdateSymptomQuestionnaire';
import PaginatedSymptomQuestionnaireResponse from '@/graphql/types/responses/symptom-questionnaire/PaginatedSymptomQuestionnaireResponse';
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
  async updateSymptomQuestionnaire(@Args() { idSharedBetweenVersions, questionnaire }: UpdateSymptomQuestionnaireArgs): Promise<SymptomQuestionnaire> {
    const newSymptomQuestionnaire = SymptomQuestionnaire.create(questionnaire);
    return createSymptomQuestionnaireVersion(idSharedBetweenVersions, newSymptomQuestionnaire);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async publishSymptomQuestionnaire(@Arg('id') id: string): Promise<GenericResponse> {
    return updateSymptomQuestionnairePublishStatus(id, true);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async unpublishSymptomQuestionnaire(@Arg('id') id: string): Promise<GenericResponse> {
    return updateSymptomQuestionnairePublishStatus(id, false);
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => GenericResponse)
  async changeSymptomQuestionnairePublishStatus(@Arg('id') id: string, @Arg('isPublished') isPublished: boolean): Promise<GenericResponse> {
    return updateSymptomQuestionnairePublishStatus(id, isPublished);
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => PaginatedSymptomQuestionnaireResponse)
  async symptomQuestionnaires(@Args() args: SymptomQuestionnairesArgs): Promise<PaginatedSymptomQuestionnaireResponse> {
    const { pageNumber, resultsPerPage, orderBy } = args;
    const pagination = { pageNumber, resultsPerPage, orderBy };

    const where = {
      currentVersionsOnly: args.currentVersionsOnly,
      nameForManagement: args.nameForManagement,
      isPublished: args.isPublished,
      withDeleted: args.withDeleted,
    };

    // await new Promise((r) => setTimeout(r, 1000));
    return getPaginatedSymptomQuestionnaires({ pagination, where });
  }
}
