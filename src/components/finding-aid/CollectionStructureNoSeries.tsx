
import React from 'react';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import CollectionIContent from './CollectionIContent';
import CollectionIIContent from './CollectionIIContent';
import CollectionIIIContent from './CollectionIIIContent';
import { TreeProvider } from './TreeContext';
import ToggleExpandButton from './collections/ToggleExpandButton';

interface CollectionStructureNoSeriesProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | FileUnitStatus;
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Inner component to use the context
const CollectionStructureNoSeriesContent: React.FC<CollectionStructureNoSeriesProps> = ({
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
        <CollectionIContent searchTerm={searchTerm} statusFilter={statusFilter} />
        <CollectionIIContent searchTerm={searchTerm} statusFilter={statusFilter} />
        <CollectionIIIContent searchTerm={searchTerm} statusFilter={statusFilter} />
      </div>
    </div>
  );
};

// Main component that wraps the content with the TreeProvider
const CollectionStructureNoSeries: React.FC<CollectionStructureNoSeriesProps> = (props) => {
  return (
    <TreeProvider>
      <CollectionStructureNoSeriesContent {...props} />
    </TreeProvider>
  );
};

export default CollectionStructureNoSeries;
