import PaginatedSymptomQuestionnaireResponse from '@/graphql/types/responses/symptom-questionnaire/PaginatedSymptomQuestionnaireResponse';
import SymptomQuestionnairesArgs from '@/graphql/types/args/query/symptom-questionnaire/SymptomQuestionnairesArgs';
import { GetSymptomQuestionnairesArgs, findAndCountSymptomQuestionnaires } from '@/services/SymptomQuestionnaireService';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import SymptomQuestionnaireFields from '@/interfaces/SymptomQuestionnaireFields';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import { Like, IsNull } from 'typeorm';

type Args = {
  pagination: PaginationArgs<SymptomQuestionnaireFields>;
  where: Pick<SymptomQuestionnairesArgs, 'nameForManagement' | 'isPublished' | 'currentVersionsOnly' | 'withDeleted'>;
};

function convertGqlArgsToORM(where: Args['where']): GetSymptomQuestionnairesArgs['where'] {
  const { currentVersionsOnly, isPublished } = where;
  const idOfCurrentVersion = currentVersionsOnly ? IsNull() : undefined;
  const nameForManagement = where.nameForManagement ? Like(`%${where.nameForManagement}%`) : undefined;
  return { idOfCurrentVersion, isPublished, nameForManagement };
}

export default async function getPaginatedSymptomQuestionnaires(args: Args): Promise<PaginatedSymptomQuestionnaireResponse> {
  const { withDeleted } = args.where;
  const where = convertGqlArgsToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const [results, totalResultsCount] = await findAndCountSymptomQuestionnaires({ pagination, where, withDeleted });

  const { pageNumber, resultsPerPage } = args.pagination;
  const response = convertToPaginatedResponse({
    pageNumber, resultsPerPage, totalResultsCount, results,
  });

  return response;
}
