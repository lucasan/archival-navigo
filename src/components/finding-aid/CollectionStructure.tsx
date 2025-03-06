
import React from 'react';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import SeriesIContent from './SeriesIContent';
import SeriesIIContent from './SeriesIIContent';
import SeriesIIIContent from './SeriesIIIContent';

interface CollectionStructureProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | FileUnitStatus;
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CollectionStructure: React.FC<CollectionStructureProps> = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter
}) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-3 sm:p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Collection Structure</h3>
      
      <SearchControls 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        statusFilter={statusFilter}
        handleStatusFilter={handleStatusFilter}
      />
      
      <div className="space-y-2 text-sm md:text-base overflow-x-auto">
        <SeriesIContent searchTerm={searchTerm} statusFilter={statusFilter} />
        <SeriesIIContent searchTerm={searchTerm} statusFilter={statusFilter} />
        <SeriesIIIContent searchTerm={searchTerm} statusFilter={statusFilter} />
      </div>
    </div>
  );
};

export default CollectionStructure;
