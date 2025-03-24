
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import SeriesIIContent from './SeriesIIContent';
import { TreeProvider, useTreeContext } from './TreeContext';

interface CollectionStructureProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | FileUnitStatus;
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Create a ToggleButton component that uses the TreeContext
const ToggleExpandButton = () => {
  const { expandAll, toggleExpandAll } = useTreeContext();
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleExpandAll}
      className="ml-auto flex items-center gap-1"
    >
      {expandAll ? (
        <>
          <ChevronUp size={16} />
          <span>Collapse All</span>
        </>
      ) : (
        <>
          <ChevronDown size={16} />
          <span>Expand All</span>
        </>
      )}
    </Button>
  );
};

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
