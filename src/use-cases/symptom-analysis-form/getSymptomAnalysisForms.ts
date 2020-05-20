import SymptomAnalysisForm from '@/entities/SymptomAnalysisForm';
import PaginatedSymptomAnalysisFormResponse from '@/graphql/types/responses/symptom-analysis-form/PaginatedSymptomAnalysisFormResponse';
import { convertGqlPaginationToORM } from '@/services/PaginationService';
import PaginationArgs from '@/graphql/types/args/query/reusable/Pagination';

type GetSymptomAnalysisFormsArgs = {
  pagination: PaginationArgs;
};

export default async function getSymptomAnalysisForms(args: GetSymptomAnalysisFormsArgs): Promise<PaginatedSymptomAnalysisFormResponse> {
  const paginationOptions = convertGqlPaginationToORM(args.pagination);
  const [records, totalRecords] = await SymptomAnalysisForm.findAndCount({
    ...paginationOptions,
  });

  const totalPages = Math.ceil(totalRecords / args.pagination.resultsPerPage);
  const hasMorePages = args.pagination.pageNumber < totalPages;

  const response: PaginatedSymptomAnalysisFormResponse = {
    records,
    totalRecords,
    hasMorePages,
  };

  return response;
}
