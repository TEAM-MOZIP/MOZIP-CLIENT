import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@pages/package/apis/policyApi';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  });
