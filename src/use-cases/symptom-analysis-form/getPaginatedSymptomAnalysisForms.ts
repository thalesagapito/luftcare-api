import PaginatedSymptomAnalysisFormResponse from '@/graphql/types/responses/symptom-analysis-form/PaginatedSymptomAnalysisFormResponse';
import SymptomAnalysisFormsArgs from '@/graphql/types/args/query/symptom-analysis-form/SymptomAnalysisFormsArgs';
import { GetSymptomAnalysisFormsArgs, findAndCountSymptomAnalysisForms } from '@/services/SymptomAnalysisFormService';
import { convertGqlPaginationToORM, convertToPaginatedResponse } from '@/services/PaginationService';
import SymptomAnalysisFormFields from '@/interfaces/SymptomAnalysisFormFields';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';
import { Like, IsNull } from 'typeorm';

type Args = {
  pagination: PaginationArgs<SymptomAnalysisFormFields>;
  where: Pick<SymptomAnalysisFormsArgs, 'name' | 'isPublished' | 'currentVersionsOnly' | 'withDeleted'>;
};

function convertGqlArgsToORM(where: Args['where']): GetSymptomAnalysisFormsArgs['where'] {
  const { currentVersionsOnly, isPublished } = where;
  const idOfCurrentVersion = currentVersionsOnly ? IsNull() : undefined;
  const name = where.name ? Like(`%${where.name}%`) : undefined;
  return { idOfCurrentVersion, isPublished, name };
}

export default async function getPaginatedSymptomAnalysisForms(args: Args): Promise<PaginatedSymptomAnalysisFormResponse> {
  const { withDeleted } = args.where;
  const where = convertGqlArgsToORM(args.where);
  const pagination = convertGqlPaginationToORM(args.pagination);
  const [results, totalResultsCount] = await findAndCountSymptomAnalysisForms({ pagination, where, withDeleted });

  const { pageNumber, resultsPerPage } = args.pagination;
  const response = convertToPaginatedResponse({
    pageNumber, resultsPerPage, totalResultsCount, results,
  });

  return response;
}
