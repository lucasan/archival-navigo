
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, AlertCircle, Database } from 'lucide-react';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
  
  // State to track direct table check
  const [directCheckDone, setDirectCheckDone] = useState(false);
  const [directData, setDirectData] = useState<FOIARecord[] | null>(null);
  const [directCheckError, setDirectCheckError] = useState<string | null>(null);
  const [schemaInfo, setSchemaInfo] = useState<any>(null);

  // Check database schema information
  useEffect(() => {
    const checkDatabaseSchema = async () => {
      try {
        console.log("%c[SCHEMA DEBUG] Checking database schema...", "background: #4b0082; color: #ffffff; font-weight: bold;");
        
        // First try to get list of schemas
        const { data: schemas, error: schemasError } = await supabase.rpc('get_schemas');
        console.log("%c[SCHEMA DEBUG] Available schemas:", "background: #4b0082; color: #ffffff;", { schemas, error: schemasError });
        
        if (schemasError) {
          console.log("%c[SCHEMA DEBUG] Error getting schemas, checking tables directly", "background: #4b0082; color: #ffffff;");
          // If that fails, try to get list of tables
          const { data: tables, error: tablesError } = await supabase.from('information_schema.tables').select('*');
          console.log("%c[SCHEMA DEBUG] Tables info:", "background: #4b0082; color: #ffffff;", { tables, error: tablesError });
          
          setSchemaInfo({ tables, error: tablesError });
        } else {
          setSchemaInfo({ schemas, error: schemasError });
        }
      } catch (e) {
        console.error("%c[SCHEMA DEBUG] Schema check error:", "background: #4b0082; color: #ff6347;", e);
        setSchemaInfo({ error: (e as Error).message });
      }
    };
    
    checkDatabaseSchema();
  }, []);

  // Direct check of the table (for debugging)
  useEffect(() => {
    const checkTableDirectly = async () => {
      try {
        console.log("%c[DEBUG] Performing direct table check...", "background: #222; color: #bada55; font-weight: bold;");
        
        // Log the raw client details
        console.log("%c[DEBUG] Supabase client:", "background: #222; color: #bada55;", supabase);
        
        // First, check for specific table in various schemas
        const schemas = ['public', 'bush_fa'];
        let tableFound = false;
        let tableData = null;
        let tableError = null;
        
        for (const schema of schemas) {
          console.log(`%c[DEBUG] Trying to access table in schema: ${schema}`, "background: #222; color: #bada55;");
          
          // Try with fully qualified name
          const { data: checkData, error: checkError } = await supabase
            .from(`${schema}.foia`)
            .select('count(*)', { count: 'exact', head: true });
            
          console.log(`%c[DEBUG] Check result for ${schema}.foia:`, "background: #222; color: #bada55;", { data: checkData, error: checkError });
          
          if (!checkError) {
            console.log(`%c[DEBUG] Table found in schema: ${schema}`, "background: #222; color: #bada55;");
            tableFound = true;
            
            // Try to fetch actual data from this schema
            const { data, error, count } = await supabase
              .from(`${schema}.foia`)
              .select('*', { count: 'exact' });
              
            tableData = data;
            tableError = error;
            break;
          }
        }
        
        if (!tableFound) {
          // Fall back to default schema access
          console.log("%c[DEBUG] Falling back to default table access", "background: #222; color: #bada55;");
          
          // Try to query all columns with count
          const { data, error, count } = await supabase
            .from('foia')
            .select('*', { count: 'exact' });
            
          tableData = data;
          tableError = error;
        }
        
        // Log the raw query response
        console.log("%c[DEBUG] Direct query response:", "background: #222; color: #bada55;", { 
          data: tableData, 
          error: tableError, 
          tableFound 
        });
        
        if (tableError) {
          console.error('%c[ERROR] Direct check error:', "background: #222; color: #ff6347;", tableError);
          toast.error(`Direct check failed: ${tableError.message}`);
          setDirectCheckError(`Query error: ${tableError.message}`);
        } else {
          // Log data characteristics
          console.log("%c[DEBUG] Result type:", "background: #222; color: #bada55;", Array.isArray(tableData) ? 'Array' : typeof tableData);
          console.log("%c[DEBUG] Result count:", "background: #222; color: #bada55;", tableData?.length);
          
          if (Array.isArray(tableData) && tableData.length > 0) {
            // Log the structure of the first record to verify schema
            console.log("%c[DEBUG] First record structure:", "background: #222; color: #bada55;", Object.keys(tableData[0]));
            console.log("%c[DEBUG] First record data:", "background: #222; color: #bada55;", tableData[0]);
          } else {
            console.log("%c[DEBUG] No records found in direct query", "background: #222; color: #ff6347;");
          }
          
          setDirectData(tableData as FOIARecord[]);
        }
      } catch (e) {
        console.error('%c[ERROR] Unexpected error in direct check:', "background: #222; color: #ff6347;", e);
        setDirectCheckError(`Unexpected error: ${(e as Error).message}`);
      } finally {
        setDirectCheckDone(true);
      }
    };
    
    checkTableDirectly();
  }, []);

  // Function to fetch FOIA records from Supabase with search and pagination
  const fetchFOIARecords = async () => {
    const baseLog = "[DEBUG FETCH]";
    console.log(`%c${baseLog} Starting fetch with pagination and filters:`, "background: #222; color: #4CAF50; font-weight: bold;");
    
    // Calculate the range for pagination
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    
    try {
      console.log(`%c${baseLog} Pagination range:`, "background: #222; color: #4CAF50;", { from, to, page: currentPage, itemsPerPage: ITEMS_PER_PAGE });
      
      // Try different schema approaches
      const schemas = ['public', 'bush_fa', ''];
      let queryResult = null;
      
      for (const schema of schemas) {
        // Build table name with schema if provided
        const tableName = schema ? `${schema}.foia` : 'foia';
        console.log(`%c${baseLog} Trying to query table: ${tableName}`, "background: #222; color: #4CAF50;");
        
        // Build base query
        let query = supabase
          .from(tableName)
          .select('id, foia_number, title, processed_by, scope, created_at', { count: 'exact' });
        
        console.log(`%c${baseLog} Base query created with select columns`, "background: #222; color: #4CAF50;");
        
        // Apply search filter if search query exists
        if (searchQuery) {
          const searchFilter = `foia_number.ilike.%${searchQuery}%, title.ilike.%${searchQuery}%, scope.ilike.%${searchQuery}%`;
          console.log(`%c${baseLog} Applying search filter:`, "background: #222; color: #4CAF50;", { searchQuery, searchFilter });
          query = query.or(searchFilter);
        }
        
        // Log the query before executing (approximation of what's being sent)
        console.log(`%c${baseLog} Query for ${tableName}:`, "background: #222; color: #4CAF50;", {
          table: tableName,
          select: 'id, foia_number, title, processed_by, scope, created_at',
          count: 'exact',
          order: 'created_at (desc)',
          range: `${from}-${to}`,
          filters: searchQuery ? `or(foia_number.ilike.%${searchQuery}%, title.ilike.%${searchQuery}%, scope.ilike.%${searchQuery}%)` : 'none'
        });
        
        // Apply pagination and execute
        const startTime = performance.now();
        const result = await query
          .order('created_at', { ascending: false })
          .range(from, to);
        const endTime = performance.now();
        
        console.log(`%c${baseLog} Query execution time for ${tableName}:`, "background: #222; color: #4CAF50;", `${Math.round(endTime - startTime)}ms`);
        console.log(`%c${baseLog} Result for ${tableName}:`, "background: #222; color: #4CAF50;", result);
        
        if (!result.error) {
          queryResult = result;
          console.log(`%c${baseLog} Successfully queried ${tableName}`, "background: #222; color: #4CAF50;");
          break;
        } else {
          console.error(`%c${baseLog} Error querying ${tableName}:`, "background: #222; color: #ff6347;", result.error);
        }
      }
      
      if (!queryResult || queryResult.error) {
        const finalError = queryResult?.error || new Error("Failed to query any table version");
        console.error(`%c${baseLog} All query attempts failed:`, "background: #222; color: #ff6347;", finalError);
        toast.error(`Failed to load data: ${finalError.message}`);
        throw finalError;
      }
      
      const { data, count } = queryResult;
      
      console.log(`%c${baseLog} Final response data:`, "background: #222; color: #4CAF50;", { 
        dataReceived: Boolean(data), 
        dataLength: data?.length || 0, 
        count, 
        firstItem: data && data.length > 0 ? data[0] : null
      });
      
      return { 
        records: data as FOIARecord[], 
        totalCount: count || 0
      };
    } catch (error) {
      console.error(`%c${baseLog} Unexpected error:`, "background: #222; color: #ff6347;", error);
      toast.error('Failed to load data. Please try again later.');
      throw error;
    }
  };

  // Use React Query to fetch data
  const { data, isLoading, isError, error, refetch } = useQuery({
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
        
        {/* Schema Debug Info */}
        {schemaInfo && (
          <Alert className="mb-6 bg-purple-50">
            <Database className="h-4 w-4" />
            <AlertTitle>Database Schema Information</AlertTitle>
            <AlertDescription>
              <div className="text-xs overflow-auto max-h-32">
                {schemaInfo.error ? (
                  <div className="text-red-500">
                    Error retrieving schema: {schemaInfo.error}
                  </div>
                ) : (
                  <pre>{JSON.stringify(schemaInfo, null, 2)}</pre>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Debug info */}
        {directCheckDone && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Database Connectivity Check</AlertTitle>
            <AlertDescription>
              {directCheckError ? (
                <div className="text-red-500">
                  Error: {directCheckError}
                </div>
              ) : (
                <>
                  Direct database check: {directData ? `Found ${directData.length} records` : 'No records found'}
                  {directData && directData.length > 0 && (
                    <p className="text-sm mt-2">
                      First record: {directData[0].foia_number || 'N/A'} - {directData[0].scope || directData[0].title || 'N/A'}
                    </p>
                  )}
                </>
              )}
              <div className="flex gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setDirectCheckDone(false);
                    setDirectData(null);
                    setDirectCheckError(null);
                    // Re-run the direct check
                    setTimeout(() => {
                      const checkTableDirectly = async () => {
                        try {
                          console.log("%c[DEBUG] Re-running direct table check...", "background: #222; color: #bada55");
                          
                          // Try with custom schema
                          const { data: bushData, error: bushError } = await supabase
                            .from('bush_fa.foia')
                            .select('*');
                            
                          console.log("%c[DEBUG] bush_fa.foia result:", "background: #222; color: #bada55", { 
                            data: bushData, 
                            error: bushError 
                          });
                          
                          if (!bushError && bushData) {
                            setDirectData(bushData as FOIARecord[]);
                          } else {
                            // Try default table
                            const { data, error } = await supabase
                              .from('foia')
                              .select('*');
                            
                            if (error) {
                              console.error('%c[ERROR] Direct check error:', "background: #222; color: #ff6347", error);
                              setDirectCheckError(`Query error: ${error.message}`);
                            } else {
                              console.log("%c[DEBUG] Direct check re-run result:", "background: #222; color: #bada55", { 
                                data, 
                                count: data?.length 
                              });
                              setDirectData(data as FOIARecord[]);
                            }
                          }
                        } catch (e) {
                          console.error('%c[ERROR] Unexpected error in direct check:', "background: #222; color: #ff6347", e);
                          setDirectCheckError(`Unexpected error: ${(e as Error).message}`);
                        } finally {
                          setDirectCheckDone(true);
                        }
                      };
                      
                      checkTableDirectly();
                    }, 100);
                  }}
                >
                  Retry Direct Check
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => refetch()}
                >
                  Retry Query
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
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
