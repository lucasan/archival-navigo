
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import { ITEMS_PER_PAGE, useFOIAData } from '@/hooks/useFOIAData';
import SearchBar from '@/components/foia/SearchBar';
import DataTable from '@/components/foia/DataTable';
import PaginationControls from '@/components/foia/PaginationControls';
import { toast } from 'sonner';

const FOIAFindingAidsListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [searchInput, setSearchInput] = useState(searchQuery);
  
  const { data, isLoading, isError, error, refetch } = useFOIAData({ searchQuery, currentPage });

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

  const clearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    params.set('page', '1');
    setSearchParams(params);
    toast.success('Search cleared');
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo(0, 0);
  };

  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">FOIA Finding Aids Listing</h1>
        
        <SearchBar 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
        
        <DataTable 
          records={data?.records || []}
          isLoading={isLoading}
          isError={isError}
          error={error as Error}
          totalCount={data?.totalCount || 0}
          searchQuery={searchQuery}
        />
        
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default FOIAFindingAidsListing;
