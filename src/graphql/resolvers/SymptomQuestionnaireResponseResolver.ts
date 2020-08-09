import {
  Arg,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import GenericResponse from '@/graphql/types/responses/reusable/GenericResponse';
import SymptomQuestionnaireResponse from '@/entities/SymptomQuestionnaireResponse';
import SymptomQuestionnaireResponseInput from '@/graphql/types/args/mutation/symptom-questionnaire-response/SymptomQuestionnaireResponseInput';
import createSymptomQuestionnaireResponse from '@/use-cases/symptom-questionnaire-response/createSymptomQuestionnaireResponse';

@Resolver(() => SymptomQuestionnaireResponse)
export default class SymptomQuestionnaireResponseResolver {
  @Authorized()
  @Mutation(() => GenericResponse)
  async createSymptomQuestionnaireResponse(@Arg('response') response: SymptomQuestionnaireResponseInput): Promise<GenericResponse> {
    // TODO add verification to make sure only the logged user can submit responses
    await createSymptomQuestionnaireResponse(response);

    return { userFriendlyMessage: 'whoop' };
  }
}
