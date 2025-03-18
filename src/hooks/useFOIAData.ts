
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { FetchFOIAResponse, FOIARecord } from '@/components/foia/types';

export const ITEMS_PER_PAGE = 25; // Changed from 50 to 25 as requested

// Generate 50 dummy FOIA records
const generateDummyRecords = (): FOIARecord[] => {
  const records: FOIARecord[] = [];
  
  for (let i = 1; i <= 50; i++) {
    records.push({
      id: i,
      foia_number: `FOIA-2023-${i.toString().padStart(4, '0')}`,
      title: `Research material on ${['Budget Policy', 'Foreign Affairs', 'Domestic Policy', 'National Security', 'Energy Policy'][i % 5]}`,
      processed_by: `Processor ${i % 10 + 1}`,
      scope: `Contains ${i % 3 + 1} boxes of material related to presidential administration policies and procedures.`,
      created_at: new Date(2023, i % 12, (i % 28) + 1).toISOString()
    });
  }
  
  return records;
};

// Create 50 dummy records
const DUMMY_RECORDS = generateDummyRecords();

interface UseFOIADataParams {
  searchQuery: string;
  currentPage: number;
}

export const useFOIAData = ({ searchQuery, currentPage }: UseFOIADataParams) => {
  const fetchFOIARecords = async (): Promise<FetchFOIAResponse> => {
    try {
      console.log('Fetching dummy FOIA records:', { page: currentPage, searchQuery });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter records based on search query if provided
      let filteredRecords = [...DUMMY_RECORDS];
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredRecords = DUMMY_RECORDS.filter(record => 
          (record.foia_number?.toLowerCase().includes(query) || false) ||
          (record.title?.toLowerCase().includes(query) || false) ||
          (record.scope?.toLowerCase().includes(query) || false)
        );
      }
      
      // Calculate pagination
      const totalCount = filteredRecords.length;
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = Math.min(from + ITEMS_PER_PAGE, totalCount);
      const paginatedRecords = filteredRecords.slice(from, to);
      
      console.log(`Found ${totalCount} records, returning ${paginatedRecords.length} records for page ${currentPage}`);
      
      return { 
        records: paginatedRecords, 
        totalCount: totalCount 
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
