
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import { TreeProvider, useTreeContext } from './TreeContext';
import FileUnitNodeDirectAccess from './FileUnitNodeDirectAccess';

interface CollectionStructureNoContainersProps {
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
const CollectionStructureNoContainersContent: React.FC<CollectionStructureNoContainersProps> = ({
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
        {/* Series I File Units - Direct Access */}
        <FileUnitNodeDirectAccess 
          title="File Unit 1: Correspondence with Jefferson, 1780-1826" 
          status="digitized"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
        
        <FileUnitNodeDirectAccess 
          title="File Unit 2: Correspondence with Monroe, 1786-1820" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />

        {/* Series II File Units - Direct Access */}
        <FileUnitNodeDirectAccess 
          title="File Unit 3: Montpelier Renovation Plans, 1797-1812" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
        
        <FileUnitNodeDirectAccess 
          title="File Unit 4: Virginia Land Deeds, 1760-1836" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
        
        {/* Series III File Units - Direct Access */}
        <FileUnitNodeDirectAccess 
          title="File Unit 5: Estate Accounts" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
        
        <FileUnitNodeDirectAccess 
          title="File Unit 6: Personal Expenses" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
};

// Main component that wraps the content with the TreeProvider
const CollectionStructureNoContainers: React.FC<CollectionStructureNoContainersProps> = (props) => {
  return (
    <TreeProvider>
      <CollectionStructureNoContainersContent {...props} />
    </TreeProvider>
  );
};

export default CollectionStructureNoContainers;
