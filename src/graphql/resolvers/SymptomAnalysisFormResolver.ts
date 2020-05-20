import {
  Arg,
  Mutation,
  Resolver,
  Authorized,
  Query,
  Args,
} from 'type-graphql';
import { UserRole } from '@/enums';
import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import SymptomAnalysisFormsArgs from '@/graphql/types/args/query/symptom-analysis-form/SymptomAnalysisFormsArgs';
import CreateSymptomAnalysisFormInput from '@/graphql/types/args/mutation/symptom-analysis-form/CreateSymptomAnalysisForm';
// import SymptomAnalysisFormsArgs from '@/query-args/symptom-analysis-form/SymptomAnalysisFormsArgs';
// import { NullablePromise, Nullable } from '@/types/Helpers';

@Resolver(() => SymptomAnalysisForm)
export default class SymptomAnalysisFormResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomAnalysisForm)
  async createSymptomAnalysisForm(@Arg('form') form: CreateSymptomAnalysisFormInput): Promise<SymptomAnalysisForm> {
    const newSymptomAnalysisForm = SymptomAnalysisForm.create(form);
    return newSymptomAnalysisForm.save();
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => [SymptomAnalysisForm])
  async symptomAnalysisForms(@Args() { orderBy, pageNumber, resultsPerPage }: SymptomAnalysisFormsArgs): Promise<SymptomAnalysisForm[]> {
    // const symptomAnalysisForms = SymptomAnalysisForm.find({ relations: ['questions'] });
    console.log({ orderBy, pageNumber, resultsPerPage });
    // return newSymptomAnalysisForm.save();
    // console.log(JSON.stringify(info.fieldNodes, undefined, 2));
    // console.log(JSON.stringify({ orderBy, pageNumber, resultsPerPage }, undefined, 2));
    return [];
    // return symptomAnalysisForms;
  }
}
