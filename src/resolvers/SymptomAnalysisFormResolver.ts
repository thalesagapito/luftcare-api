import {
  Arg,
  // Ctx,
  // Query,
  Mutation,
  Resolver,
  Authorized,
  // Authorized,
} from 'type-graphql';
// import { GraphqlContext } from '@/server';
import { UserRole } from '@/enums';
import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import CreateSymptomAnalysisFormInput from '@/input-types/symptom-analysis-form/CreateSymptomAnalysisFormInput';
// import RegisterSymptomAnalysisFormInput from '@/inputs/user/RegisterSymptomAnalysisFormInput';
// import { getSymptomAnalysisFormById, getSymptomAnalysisFormByEmail } from '@/services/SymptomAnalysisFormService';

@Resolver()
export default class SymptomAnalysisFormResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomAnalysisForm)
  async createSymptomAnalysisForm(
    @Arg('form') data: CreateSymptomAnalysisFormInput,
  ): Promise<SymptomAnalysisForm> {
    console.log(data);
    const newSymptomAnalysisForm = SymptomAnalysisForm.create({
      name: 'Teste',
    });

    console.log(newSymptomAnalysisForm);

    await newSymptomAnalysisForm.save();

    console.log(newSymptomAnalysisForm);

    return newSymptomAnalysisForm;
    // return createSymptomAnalysisFormFromRegisterInput(userData);
  }
}
