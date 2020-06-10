import {
  Arg,
  Args,
  Query,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import { UserRole } from '@/enums';
import SymptomAnalysisQuestionnaire from '@/entities/SymptomAnalysisQuestionnaire';
import SymptomAnalysisQuestionnairesArgs from '@/graphql/types/args/query/symptom-analysis-questionnaire/SymptomAnalysisQuestionnairesArgs';
import getPaginatedSymptomAnalysisQuestionnaires from '@/use-cases/symptom-analysis-questionnaire/getPaginatedSymptomAnalysisQuestionnaires';
import CreateSymptomAnalysisQuestionnaireInput from '@/graphql/types/args/mutation/symptom-analysis-questionnaire/CreateSymptomAnalysisQuestionnaire';
import PaginatedSymptomAnalysisQuestionnaireResponse from '@/graphql/types/responses/symptom-analysis-questionnaire/PaginatedSymptomAnalysisQuestionnaireResponse';

@Resolver(() => SymptomAnalysisQuestionnaire)
export default class SymptomAnalysisQuestionnaireResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomAnalysisQuestionnaire)
  async createSymptomAnalysisQuestionnaire(@Arg('questionnaire') questionnaire: CreateSymptomAnalysisQuestionnaireInput): Promise<SymptomAnalysisQuestionnaire> {
    const newSymptomAnalysisQuestionnaire = SymptomAnalysisQuestionnaire.create(questionnaire);
    return newSymptomAnalysisQuestionnaire.save();
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => PaginatedSymptomAnalysisQuestionnaireResponse)
  async symptomAnalysisQuestionnaires(@Args() args: SymptomAnalysisQuestionnairesArgs): Promise<PaginatedSymptomAnalysisQuestionnaireResponse> {
    const { pageNumber, resultsPerPage, orderBy } = args;
    const pagination = { pageNumber, resultsPerPage, orderBy };

    const {
      currentVersionsOnly, isPublished, withDeleted, nameForManagement,
    } = args;
    const where = {
      currentVersionsOnly, isPublished, withDeleted, nameForManagement,
    };

    // await new Promise((r) => setTimeout(r, 1000));
    return getPaginatedSymptomAnalysisQuestionnaires({ pagination, where });
  }
}
