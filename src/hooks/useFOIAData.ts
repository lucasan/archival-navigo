
import { useQuery } from '@tanstack/react-query';
import { supabase, getBushFaFoiaDataPaginated } from '@/integrations/supabase/client';
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
      // Skip direct querying of 'foia' table and use the RPC directly
      // Only pass the required parameters to avoid function selection ambiguity
      const rpcResponse = await getBushFaFoiaDataPaginated(from, to, searchQuery);
      
      if (rpcResponse.error) {
        toast.error(`Failed to load data: ${rpcResponse.error.message}`);
        throw rpcResponse.error;
      }
      
      // Count total records via another RPC call for accurate pagination
      const countQuery = await supabase.rpc('get_bush_fa_foia_data');
      const totalCount = countQuery.data ? countQuery.data.length : 0;
      
      return { 
        records: rpcResponse.data || [], 
        totalCount: totalCount
      };
    } catch (error) {
      toast.error('Failed to load data. Please try again later.');
      throw error;
    }
  };

  return useQuery({
    queryKey: ['foiaRecords', searchQuery, currentPage],
    queryFn: fetchFOIARecords
  });
};
