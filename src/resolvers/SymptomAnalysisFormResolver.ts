import {
  Arg,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import { UserRole } from '@/enums';
import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import CreateSymptomAnalysisFormInput from '@/input-types/symptom-analysis-form/CreateSymptomAnalysisForm';

@Resolver()
export default class SymptomAnalysisFormResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomAnalysisForm)
  async createSymptomAnalysisForm(@Arg('form') form: CreateSymptomAnalysisFormInput): Promise<SymptomAnalysisForm> {
    const newSymptomAnalysisForm = SymptomAnalysisForm.create(form);
    return newSymptomAnalysisForm.save();
  }
}
