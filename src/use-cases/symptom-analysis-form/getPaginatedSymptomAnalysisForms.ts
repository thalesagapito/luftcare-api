import PaginatedSymptomAnalysisQuestionnaireResponse from '@/graphql/types/responses/symptom-analysis-questionnaire/PaginatedSymptomAnalysisQuestionnaireResponse';
import SymptomAnalysisQuestionnairesArgs from '@/graphql/types/args/query/symptom-analysis-questionnaire/SymptomAnalysisQuestionnairesArgs';
import { GetSymptomAnalysisQuestionnairesArgs, findAndCountSymptomAnalysisQuestionnaires } from '@/services/SymptomAnalysisQuestionnaireService';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import SymptomAnalysisQuestionnaireFields from '@/interfaces/SymptomAnalysisQuestionnaireFields';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import { Like, IsNull } from 'typeorm';

type Args = {
  pagination: PaginationArgs<SymptomAnalysisQuestionnaireFields>;
  where: Pick<SymptomAnalysisQuestionnairesArgs, 'nameForManagement' | 'isPublished' | 'currentVersionsOnly' | 'withDeleted'>;
};

function convertGqlArgsToORM(where: Args['where']): GetSymptomAnalysisQuestionnairesArgs['where'] {
  const { currentVersionsOnly, isPublished } = where;
  const idOfCurrentVersion = currentVersionsOnly ? IsNull() : undefined;
  const nameForManagement = where.nameForManagement ? Like(`%${where.nameForManagement}%`) : undefined;
  return { idOfCurrentVersion, isPublished, nameForManagement };
}

export default async function getPaginatedSymptomAnalysisQuestionnaires(args: Args): Promise<PaginatedSymptomAnalysisQuestionnaireResponse> {
  const { withDeleted } = args.where;
  const where = convertGqlArgsToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const [results, totalResultsCount] = await findAndCountSymptomAnalysisQuestionnaires({ pagination, where, withDeleted });

  const { pageNumber, resultsPerPage } = args.pagination;
  const response = convertToPaginatedResponse({
    pageNumber, resultsPerPage, totalResultsCount, results,
  });

  return response;
}
