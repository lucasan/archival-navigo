
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
    const baseLog = "[DEBUG FETCH]";
    console.log(`%c${baseLog} Starting fetch with pagination and filters:`, "background: #222; color: #4CAF50; font-weight: bold;");
    
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    
    try {
      console.log(`%c${baseLog} Pagination range:`, "background: #222; color: #4CAF50;", { from, to, page: currentPage, itemsPerPage: ITEMS_PER_PAGE });
      
      // Skip direct querying of 'foia' table and use the RPC directly
      console.log(`%c${baseLog} Using RPC to access bush_fa.foia schema:`, "background: #222; color: #4CAF50;");
      
      const rpcResponse = await getBushFaFoiaDataPaginated(from, to, searchQuery);
      
      if (rpcResponse.error) {
        console.error(`%c${baseLog} RPC call failed:`, "background: #222; color: #ff6347;", rpcResponse.error);
        toast.error(`Failed to load data: ${rpcResponse.error.message}`);
        throw rpcResponse.error;
      }
      
      // Count total records via another RPC call for accurate pagination
      const countQuery = await supabase.rpc('get_bush_fa_foia_data');
      const totalCount = countQuery.data ? countQuery.data.length : 0;
      
      console.log(`%c${baseLog} Final response data:`, "background: #222; color: #4CAF50;", { 
        dataReceived: Boolean(rpcResponse.data), 
        dataLength: rpcResponse.data?.length || 0,
        totalCount,
        firstItem: rpcResponse.data && rpcResponse.data.length > 0 ? rpcResponse.data[0] : null
      });
      
      return { 
        records: rpcResponse.data || [], 
        totalCount: totalCount
      };
    } catch (error) {
      console.error(`%c${baseLog} Unexpected error:`, "background: #222; color: #ff6347;", error);
      toast.error('Failed to load data. Please try again later.');
      throw error;
    }
  };

  return useQuery({
    queryKey: ['foiaRecords', searchQuery, currentPage],
    queryFn: fetchFOIARecords
  });
};
