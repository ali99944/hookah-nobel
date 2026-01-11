import { useGetQuery } from '../../../core/hooks/queries-actions';
import { GlobalSettings } from '../types';


export const useSettings = () => {
  return useGetQuery<GlobalSettings>({
    key: ['global_settings'],
    url: '/settings',
    options: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  });
};
