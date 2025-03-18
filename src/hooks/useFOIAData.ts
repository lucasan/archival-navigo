
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
      
      let queryResponse = await supabase
        .from('foia')
        .select('id, foia_number, title, processed_by, scope, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
        
      if (queryResponse.error || !queryResponse.data) {
        console.log(`%c${baseLog} Standard query failed, trying RPC fallback:`, "background: #222; color: #4CAF50;", queryResponse.error);
        
        const rpcResponse = await getBushFaFoiaDataPaginated(from, to, searchQuery);
          
        if (rpcResponse.error) {
          console.error(`%c${baseLog} RPC fallback failed:`, "background: #222; color: #ff6347;", rpcResponse.error);
          toast.error(`Failed to load data: ${rpcResponse.error.message}`);
          throw rpcResponse.error;
        }
        
        return { 
          records: rpcResponse.data || [], 
          totalCount: rpcResponse.count
        };
      }
      
      const { data, count } = queryResponse;
      
      console.log(`%c${baseLog} Final response data:`, "background: #222; color: #4CAF50;", { 
        dataReceived: Boolean(data), 
        dataLength: data?.length || 0, 
        count, 
        firstItem: data && data.length > 0 ? data[0] : null
      });
      
      return { 
        records: data || [], 
        totalCount: count || 0
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
