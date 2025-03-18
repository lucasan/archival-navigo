
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
      
      console.log(`%c${baseLog} Using RPC to access bush_fa.foia schema:`, "background: #222; color: #4CAF50;");
      
      // Use the RPC function to get paginated data
      const { data: paginatedData, error: paginationError } = await supabase.rpc(
        'get_bush_fa_foia_data_paginated',
        { 
          p_from: from, 
          p_to: to,
          p_search: searchQuery || null
        }
      );
      
      if (paginationError) {
        console.error(`%c${baseLog} RPC call failed:`, "background: #222; color: #ff6347;", paginationError);
        toast.error(`Failed to load data: ${paginationError.message}`);
        throw paginationError;
      }
      
      // Get total count for pagination
      const { data: allData, error: countError } = await supabase.rpc('get_bush_fa_foia_data');
      
      if (countError) {
        console.error(`%c${baseLog} Count query failed:`, "background: #222; color: #ff6347;", countError);
        throw countError;
      }
      
      const totalCount = allData ? allData.length : 0;
      const records = Array.isArray(paginatedData) ? paginatedData : [];
      
      console.log(`%c${baseLog} Final response data:`, "background: #222; color: #4CAF50;", { 
        dataReceived: Boolean(records), 
        dataLength: records.length,
        totalCount,
        firstItem: records.length > 0 ? records[0] : null
      });
      
      return { 
        records: records, 
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
