
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import NavigationHeader from '../components/finding-aid/NavigationHeader';
import { toast } from "sonner";

// Define how many items to show per page
const ITEMS_PER_PAGE = 50;

// Define the type for our FOIA data based on the Supabase schema
interface FOIARecord {
  id: number;
  foia_number: string | null;
  title: string | null;
  processed_by: string | null;
  scope: string | null;
  created_at: string;
}

const FOIAFindingAidsListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // State for search input (to prevent immediate searching on every keystroke)
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Function to fetch FOIA records from Supabase with search and pagination
  const fetchFOIARecords = async () => {
    console.log("Fetching FOIA records...");
    // Calculate the range for pagination
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    
    try {
      let query = supabase
        .from('foia')
        .select('id, foia_number, title, processed_by, scope, created_at', { count: 'exact' });
      
      // Apply search filter if search query exists
      if (searchQuery) {
        query = query.or(`foia_number.ilike.%${searchQuery}%, title.ilike.%${searchQuery}%, scope.ilike.%${searchQuery}%`);
      }
      
      // Apply pagination
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) {
        console.error('Error fetching FOIA records:', error);
        toast.error(`Failed to load data: ${error.message}`);
        throw error;
      }
      
      console.log("Fetched data:", data, "Total count:", count);
      
      return { 
        records: data as FOIARecord[], 
        totalCount: count || 0
      };
    } catch (error) {
      console.error('Unexpected error fetching FOIA records:', error);
      toast.error('Failed to load data. Please try again later.');
      throw error;
    }
  };

  // Use React Query to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['foiaRecords', searchQuery, currentPage],
    queryFn: fetchFOIARecords
  });

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set('q', searchInput);
    } else {
      params.delete('q');
    }
    params.set('page', '1'); // Reset to first page on new search
    setSearchParams(params);
  };

  // Calculate pagination information
  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic for many pages
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(null); // Ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push(null); // Ellipsis
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle pages
        pages.push(1);
        pages.push(null); // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(null); // Ellipsis
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Change page function
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">FOIA Finding Aids Listing</h1>
        
        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <Input 
              type="text"
              placeholder="Search by case number or subject..."
              className="pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-md text-sm"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Loading and error states */}
        {isLoading && <p className="text-gray-500">Loading records...</p>}
        {isError && (
          <div className="text-red-500 mb-4">
            <p>Error: {(error as Error).message}</p>
            <p className="text-sm">Please try refreshing the page or contact support.</p>
          </div>
        )}
        
        {/* Records table */}
        {!isLoading && !isError && data && (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Showing {data.records.length} of {data.totalCount} records
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Case Number</TableHead>
                    <TableHead>Subject(s)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-8 text-gray-500">
                        No records found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.foia_number || 'N/A'}</TableCell>
                        <TableCell>{record.scope || record.title || 'N/A'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {/* Previous page button */}
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => {
                        e.preventDefault();
                        goToPage(currentPage - 1);
                      }} />
                    </PaginationItem>
                  )}
                  
                  {/* Page numbers */}
                  {getPageNumbers().map((page, index) => (
                    page === null ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink 
                          href="#" 
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(page as number);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  ))}
                  
                  {/* Next page button */}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => {
                        e.preventDefault();
                        goToPage(currentPage + 1);
                      }} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FOIAFindingAidsListing;
