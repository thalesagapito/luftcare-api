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
import CreateSymptomAnalysisFormInput from '@/input-types/symptom-analysis-form/CreateSymptomAnalysisForm';
import SymptomAnalysisFormsArgs from '@/args-types/symptom-analysis-form/SymptomAnalysisFormsArgs';
import { NullablePromise } from '@/types/Helpers';

@Resolver()
export default class SymptomAnalysisFormResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomAnalysisForm)
  async createSymptomAnalysisForm(@Arg('form') form: CreateSymptomAnalysisFormInput): Promise<SymptomAnalysisForm> {
    const newSymptomAnalysisForm = SymptomAnalysisForm.create(form);
    return newSymptomAnalysisForm.save();
  }

  @Authorized(UserRole.ADMIN)
  @Query(() => [SymptomAnalysisForm], { nullable: true })
  async symptomAnalysisForms(@Args() { orderBy, pageNumber, resultsPerPage }: SymptomAnalysisFormsArgs): NullablePromise<SymptomAnalysisForm> {
    // const newSymptomAnalysisForm = SymptomAnalysisForm.create(form);
    // return newSymptomAnalysisForm.save();
    console.log(JSON.stringify({ orderBy, pageNumber, resultsPerPage }, undefined, 2));
    return undefined;
  }
}
