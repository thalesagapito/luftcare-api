import {
  Arg,
  Args,
  Query,
  Mutation,
  Resolver,
  Authorized,
} from 'type-graphql';
import { UserRole } from '@/enums';
import { v4 as uuidv4 } from 'uuid';
import SymptomQuestionnaire from '@/entities/SymptomQuestionnaire';
import versionateSymptomQuestionnaire from '@/use-cases/symptom-questionnaire/versionateSymptomQuestionnaire';
import SymptomQuestionnairesArgs from '@/graphql/types/args/query/symptom-questionnaire/SymptomQuestionnairesArgs';
import getPaginatedSymptomQuestionnaires from '@/use-cases/symptom-questionnaire/getPaginatedSymptomQuestionnaires';
import CreateSymptomQuestionnaireInput from '@/graphql/types/args/mutation/symptom-questionnaire/CreateSymptomQuestionnaire';
import UpdateSymptomQuestionnaireInput from '@/graphql/types/args/mutation/symptom-questionnaire/UpdateSymptomQuestionnaire';
import PaginatedSymptomQuestionnaireResponse from '@/graphql/types/responses/symptom-questionnaire/PaginatedSymptomQuestionnaireResponse';

@Resolver(() => SymptomQuestionnaire)
export default class SymptomQuestionnaireResolver {
  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomQuestionnaire)
  async createSymptomQuestionnaire(@Arg('questionnaire') questionnaire: CreateSymptomQuestionnaireInput): Promise<SymptomQuestionnaire> {
    const id = uuidv4();

    const versionOneQuestionnaire = SymptomQuestionnaire.create({ ...questionnaire, id, version: 1 });
    const versionZeroQuestionnaire = SymptomQuestionnaire.create({ ...questionnaire, id, version: 0 });

    const [createdVersionOne] = await SymptomQuestionnaire.save([
      versionOneQuestionnaire,
      versionZeroQuestionnaire,
    ]);

    return createdVersionOne;
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => SymptomQuestionnaire)
  async updateSymptomQuestionnaire(@Arg('questionnaire') questionnaire: UpdateSymptomQuestionnaireInput): Promise<SymptomQuestionnaire> {
    const newSymptomQuestionnaire = SymptomQuestionnaire.create(questionnaire);
    return versionateSymptomQuestionnaire(newSymptomQuestionnaire);
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
