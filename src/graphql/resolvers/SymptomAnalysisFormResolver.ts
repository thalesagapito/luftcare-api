import {
  Arg,
  Args,
  Query,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import { UserRole } from '@/enums';
import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import getSymptomAnalysisForms from '@/use-cases/symptom-analysis-form/getSymptomAnalysisForms';
import SymptomAnalysisFormsArgs from '@/graphql/types/args/query/symptom-analysis-form/SymptomAnalysisFormsArgs';
import CreateSymptomAnalysisFormInput from '@/graphql/types/args/mutation/symptom-analysis-form/CreateSymptomAnalysisForm';
import PaginatedSymptomAnalysisFormResponse from '@/graphql/types/responses/symptom-analysis-form/PaginatedSymptomAnalysisFormResponse';

@Resolver(() => SymptomAnalysisForm)
export default class SymptomAnalysisFormResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomAnalysisForm)
  async createSymptomAnalysisForm(@Arg('form') form: CreateSymptomAnalysisFormInput): Promise<SymptomAnalysisForm> {
    const newSymptomAnalysisForm = SymptomAnalysisForm.create(form);
    return newSymptomAnalysisForm.save();
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => PaginatedSymptomAnalysisFormResponse)
  async symptomAnalysisForms(@Args() args: SymptomAnalysisFormsArgs): Promise<PaginatedSymptomAnalysisFormResponse> {
    const { pageNumber, resultsPerPage, orderBy } = args;
    const pagination = { pageNumber, resultsPerPage, orderBy };
    // TODO text search

    return getSymptomAnalysisForms({ pagination });
  }
}