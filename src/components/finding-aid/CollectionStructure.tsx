
import React from 'react';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import SeriesIIContent from './SeriesIIContent';
import { TreeProvider } from './TreeContext';
import ToggleExpandButton from './collections/ToggleExpandButton';

interface CollectionStructureProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | FileUnitStatus;
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Inner component to use the context
const CollectionStructureContent: React.FC<CollectionStructureProps> = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter
}) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-lg md:text-xl font-medium">Collection Structure</h3>
        <ToggleExpandButton />
      </div>
      
      <SearchControls 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        statusFilter={statusFilter}
        handleStatusFilter={handleStatusFilter}
      />
      
      <div className="space-y-2 text-sm md:text-base overflow-x-auto">
        <SeriesIIContent searchTerm={searchTerm} statusFilter={statusFilter} />
      </div>
    </div>
  );
};

// Main component that wraps the content with the TreeProvider
const CollectionStructure: React.FC<CollectionStructureProps> = (props) => {
  return (
    <TreeProvider>
      <CollectionStructureContent {...props} />
    </TreeProvider>
  );
};

export default CollectionStructure;
