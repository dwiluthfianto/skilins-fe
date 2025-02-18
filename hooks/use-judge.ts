import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

interface JudgeFilter {
  page?: number;
  limit?: number;
  search?: string;
}

export function useJudge({ page, limit, search }: JudgeFilter) {
  const params = new URLSearchParams({
    page: page?.toString() || '1',
    limit: limit?.toString() || '10',
  });
  if (search) params.append('search', search);

  const { data, error, mutate } = useSWR(
    `/judges?${params.toString()}`,
    fetcher
  );

  const autocompleteJudges = data?.data?.map(
    (judge: { uuid: string; full_name: string }) => ({
      id: judge.uuid,
      text: judge.full_name,
    })
  );

  return {
    judges: data?.data,
    autocompleteJudges,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useJudgeUser() {
  const { data, error, mutate } = useSWR(`/judges/detail`, fetcher);

  return {
    judge: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useEvaluationParameter(competitionUuid: string) {
  const { data, error, mutate } = useSWR(
    `/judges/${competitionUuid}/evaluation-parameters`,
    fetcher
  );

  return {
    parameters: data?.data.parameters,
    parameter_scores: data?.data.parameter_scores,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useJudgeSubmission(isScore: boolean, competitionUuid: string) {
  const { data, error, mutate } = useSWR(
    isScore
      ? `/judges/scored/${competitionUuid}`
      : `/judges/unscored/${competitionUuid}`,
    fetcher
  );

  return {
    data: data?.data.data,
    summary: data?.data.summary,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
