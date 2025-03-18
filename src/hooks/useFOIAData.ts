
import { useQuery } from '@tanstack/react-query';
import { getBushFaFoiaDataPaginated } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { FetchFOIAResponse } from '@/components/foia/types';

export const ITEMS_PER_PAGE = 50;

interface UseFOIADataParams {
  searchQuery: string;
  currentPage: number;
}

export const useFOIAData = ({ searchQuery, currentPage }: UseFOIADataParams) => {
  const fetchFOIARecords = async (): Promise<FetchFOIAResponse> => {
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    
    try {
      console.log('Fetching FOIA records:', { from, to, searchQuery });
      const response = await getBushFaFoiaDataPaginated(from, to, searchQuery);
      
      if (response.error) {
        toast.error(`Failed to load data: ${response.error.message}`);
        throw response.error;
      }
      
      return { 
        records: response.data || [], 
        totalCount: response.count 
      };
    } catch (error) {
      console.error('Error in fetchFOIARecords:', error);
      toast.error('Failed to load data. Please try again later.');
      throw error;
    }
  };

  return useQuery({
    queryKey: ['foiaRecords', searchQuery, currentPage],
    queryFn: fetchFOIARecords
  });
};
