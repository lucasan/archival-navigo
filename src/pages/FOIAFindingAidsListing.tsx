
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, AlertCircle, Database } from 'lucide-react';
import { supabase, getBushFaFoiaData, getBushFaFoiaDataPaginated } from '@/integrations/supabase/client';
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

const ITEMS_PER_PAGE = 50;

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
  
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [directCheckDone, setDirectCheckDone] = useState(false);
  const [directData, setDirectData] = useState<FOIARecord[] | null>(null);
  const [directCheckError, setDirectCheckError] = useState<string | null>(null);
  const [schemaInfo, setSchemaInfo] = useState<any>(null);

  useEffect(() => {
    const checkDatabaseSchema = async () => {
      try {
        console.log("%c[SCHEMA DEBUG] Checking database schema...", "background: #4b0082; color: #ffffff; font-weight: bold;");
        
        try {
          // This needs to be an RPC function we create
          const { data, error } = await supabase.rpc('get_schema_info');
          console.log("%c[SCHEMA DEBUG] RPC result:", "background: #4b0082; color: #ffffff;", { data, error });
          setSchemaInfo({ rpcResult: data, rpcError: error });
        } catch (e) {
          console.log("%c[SCHEMA DEBUG] RPC not available:", "background: #4b0082; color: #ffffff;", e);
        }
        
        // Check if the standard table is accessible
        const { data: foiaCount, error: foiaError } = await supabase
          .from('foia')
          .select('*', { count: 'exact', head: true });
          
        console.log("%c[SCHEMA DEBUG] Foia table check:", "background: #4b0082; color: #ffffff;", { 
          count: foiaCount, 
          error: foiaError
        });
        
        setSchemaInfo(prev => ({ 
          ...prev, 
          tableCheck: { foia: { count: foiaCount, error: foiaError } } 
        }));
      } catch (e) {
        console.error("%c[SCHEMA DEBUG] Schema check error:", "background: #4b0082; color: #ff6347;", e);
        setSchemaInfo(prev => ({ ...prev, error: (e as Error).message }));
      }
    };
    
    checkDatabaseSchema();
  }, []);

  useEffect(() => {
    const checkTableDirectly = async () => {
      try {
        console.log("%c[DEBUG] Performing direct table check...", "background: #222; color: #bada55; font-weight: bold;");
        
        console.log("%c[DEBUG] Trying standard table access", "background: #222; color: #bada55;");
        // Access the public.foia table directly
        const { data, error, count } = await supabase
          .from('foia')
          .select('*', { count: 'exact' });
          
        console.log("%c[DEBUG] Direct query response:", "background: #222; color: #bada55;", { 
          data, 
          error,
          count
        });
        
        if (error) {
          console.error('%c[ERROR] Direct check error:', "background: #222; color: #ff6347;", error);
          toast.error(`Direct check failed: ${error.message}`);
          setDirectCheckError(`Query error: ${error.message}`);
          
          try {
            console.log("%c[DEBUG] Trying RPC fallback", "background: #222; color: #bada55;");
            
            // Try using the RPC helper function
            const { data: rpcData, error: rpcError } = await getBushFaFoiaData();
              
            console.log("%c[DEBUG] RPC fallback response:", "background: #222; color: #bada55;", { 
              data: rpcData, 
              error: rpcError
            });
            
            if (!rpcError && rpcData) {
              setDirectData(rpcData as FOIARecord[]);
            } else {
              setDirectCheckError(`RPC fallback error: ${rpcError?.message || 'No data returned'}`);
            }
          } catch (rpcErr) {
            console.error('%c[ERROR] RPC fallback error:', "background: #222; color: #ff6347;", rpcErr);
            setDirectCheckError(`RPC fallback error: ${(rpcErr as Error).message}`);
          }
        } else {
          console.log("%c[DEBUG] Result type:", "background: #222; color: #bada55;", Array.isArray(data) ? 'Array' : typeof data);
          console.log("%c[DEBUG] Result count:", "background: #222; color: #bada55;", data?.length);
          
          if (Array.isArray(data) && data.length > 0) {
            console.log("%c[DEBUG] First record structure:", "background: #222; color: #bada55;", Object.keys(data[0]));
            console.log("%c[DEBUG] First record data:", "background: #222; color: #bada55;", data[0]);
          } else {
            console.log("%c[DEBUG] No records found in direct query", "background: #222; color: #ff6347;");
          }
          
          setDirectData(data as FOIARecord[]);
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

  const fetchFOIARecords = async () => {
    const baseLog = "[DEBUG FETCH]";
    console.log(`%c${baseLog} Starting fetch with pagination and filters:`, "background: #222; color: #4CAF50; font-weight: bold;");
    
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    
    try {
      console.log(`%c${baseLog} Pagination range:`, "background: #222; color: #4CAF50;", { from, to, page: currentPage, itemsPerPage: ITEMS_PER_PAGE });
      
      // First try using the standard foia table in public schema
      let queryResponse = await supabase
        .from('foia')
        .select('id, foia_number, title, processed_by, scope, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
        
      if (queryResponse.error || !queryResponse.data) {
        console.log(`%c${baseLog} Standard query failed, trying RPC fallback:`, "background: #222; color: #4CAF50;", queryResponse.error);
        
        // If direct query fails, use the RPC helper function
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
        records: data as FOIARecord[], 
        totalCount: count || 0
      };
    } catch (error) {
      console.error(`%c${baseLog} Unexpected error:`, "background: #222; color: #ff6347;", error);
      toast.error('Failed to load data. Please try again later.');
      throw error;
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['foiaRecords', searchQuery, currentPage],
    queryFn: fetchFOIARecords
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set('q', searchInput);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(null);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(null);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

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
                    setTimeout(() => {
                      const checkTableDirectly = async () => {
                        try {
                          console.log("%c[DEBUG] Re-running direct table check...", "background: #222; color: #bada55");
                          
                          const { data, error } = await supabase
                            .from('foia')
                            .select('*');
                          
                          if (error) {
                            console.error('%c[ERROR] Direct check error:', "background: #222; color: #ff6347", error);
                            setDirectCheckError(`Query error: ${error.message}`);
                            
                            try {
                              const { data: rpcData, error: rpcError } = await getBushFaFoiaData();
                                
                              if (!rpcError && rpcData) {
                                setDirectData(rpcData as FOIARecord[]);
                              } else {
                                setDirectCheckError(`RPC fallback error: ${rpcError?.message || 'No data returned'}`);
                              }
                            } catch (rpcErr) {
                              setDirectCheckError(`RPC fallback error: ${(rpcErr as Error).message}`);
                            }
                          } else {
                            console.log("%c[DEBUG] Direct check re-run result:", "background: #222; color: #bada55", { 
                              data, 
                              count: data?.length 
                            });
                            setDirectData(data as FOIARecord[]);
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
        
        {isLoading && <p className="text-gray-500">Loading records...</p>}
        {isError && (
          <div className="text-red-500 mb-4">
            <p>Error: {(error as Error).message}</p>
            <p className="text-sm">Please try refreshing the page or contact support.</p>
          </div>
        )}
        
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
            
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => {
                        e.preventDefault();
                        goToPage(currentPage - 1);
                      }} />
                    </PaginationItem>
                  )}
                  
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
