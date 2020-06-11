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
import SymptomQuestionnairesArgs from '@/graphql/types/args/query/symptom-questionnaire/SymptomQuestionnairesArgs';
import getPaginatedSymptomQuestionnaires from '@/use-cases/symptom-questionnaire/getPaginatedSymptomQuestionnaires';
import CreateSymptomQuestionnaireInput from '@/graphql/types/args/mutation/symptom-questionnaire/CreateSymptomQuestionnaire';
import PaginatedSymptomQuestionnaireResponse from '@/graphql/types/responses/symptom-questionnaire/PaginatedSymptomQuestionnaireResponse';

@Resolver(() => SymptomQuestionnaire)
export default class SymptomQuestionnaireResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomQuestionnaire)
  async createSymptomQuestionnaire(@Arg('questionnaire') questionnaire: CreateSymptomQuestionnaireInput): Promise<SymptomQuestionnaire> {
    const newSymptomQuestionnaire = SymptomQuestionnaire.create(questionnaire);
    return newSymptomQuestionnaire.save();
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => PaginatedSymptomQuestionnaireResponse)
  async symptomQuestionnaires(@Args() args: SymptomQuestionnairesArgs): Promise<PaginatedSymptomQuestionnaireResponse> {
    const { pageNumber, resultsPerPage, orderBy } = args;
    const pagination = { pageNumber, resultsPerPage, orderBy };

    const {
      currentVersionsOnly, isPublished, withDeleted, nameForManagement,
    } = args;
    const where = {
      currentVersionsOnly, isPublished, withDeleted, nameForManagement,
    };

    // await new Promise((r) => setTimeout(r, 1000));
    return getPaginatedSymptomQuestionnaires({ pagination, where });
  }
}
