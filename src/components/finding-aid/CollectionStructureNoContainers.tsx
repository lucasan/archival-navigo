
import React from 'react';
import { TreeProvider } from './TreeContext';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import CollectionHeader from './collections/CollectionHeader';
import SpeechwritingCollection from './collections/SpeechwritingCollection';
import PublicLiaisonCollection from './collections/PublicLiaisonCollection';
import ScienceTechnologyCollection from './collections/ScienceTechnologyCollection';
import LiberManCollection from './collections/LiberManCollection';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTreeContext } from './TreeContext';

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
        <CollectionHeader title="Collection Structure" />
        <ToggleExpandButton />
      </div>
      
      <SearchControls 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        statusFilter={statusFilter}
        handleStatusFilter={handleStatusFilter}
      />
      
      <div className="space-y-2 text-sm md:text-base overflow-x-auto">
        {/* Speechwriting Collection */}
        <SpeechwritingCollection 
          searchTerm={searchTerm} 
          statusFilter={statusFilter} 
        />
        
        {/* Public Liaison Collection */}
        <PublicLiaisonCollection 
          searchTerm={searchTerm} 
          statusFilter={statusFilter} 
        />
        
        {/* Science and Technology Collection */}
        <ScienceTechnologyCollection 
          searchTerm={searchTerm} 
          statusFilter={statusFilter} 
        />
        
        {/* Counsel's Office - Lee Liberman Collection */}
        <LiberManCollection 
          searchTerm={searchTerm} 
          statusFilter={statusFilter} 
        />
      </div>
    </div>
  );
};

// Main component that wraps the content with the TreeProvider
const CollectionStructure: React.FC<CollectionStructureNoContainersProps> = (props) => {
  return (
    <TreeProvider>
      <CollectionStructureNoContainersContent {...props} />
    </TreeProvider>
  );
};

export default CollectionStructure;
