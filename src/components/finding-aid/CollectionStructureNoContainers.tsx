
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import { TreeProvider, useTreeContext } from './TreeContext';
import SeriesSection from './SeriesSection';
import FileUnitNode from './FileUnitNode';
import ItemNode from './ItemNode';

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
        <div className="font-bold text-base sm:text-lg mt-4 mb-2">
          GB-SPE: Records of the White House Office of Speechwriting (George H. W. Bush Administration)
        </div>
        
        <SeriesSection
          id="speech-backup"
          title="Speech Backup Chronological Files"
          description="Files containing backup materials for speeches delivered by President George H. W. Bush, arranged chronologically."
          extent="10 linear feet (24 boxes)"
          arrangement="Chronological by speech date"
          date="1989-1993"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          hideMetadata={true}
        >
          <FileUnitNode 
            title="Black History Month, 2/25/91 [OA 6855] [2]" 
            status="open"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Drafts with Presidential Annotations" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#black-history-draft"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Background Materials and Research" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#black-history-materials"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Final Speech and Delivery Notes" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#black-history-final"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
          
          <FileUnitNode 
            title="Somalia Address 12/31/92 [OA 7583]" 
            status="digitized"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Somalia Situation Report" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#somalia-report"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Somalia Operations Plan" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#somalia-plan"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
          
          <FileUnitNode 
            title="Australian Parliament 1/2/92 [OA 8332] [3]" 
            status="digitized"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Australian-American Relations Brief" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#australia-brief"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Parliament Protocol Guide" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#parliament-protocol"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Final Address with Annotations" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#australia-address-final"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
          
          <FileUnitNode 
            title="Sydney--Luncheon Cruise Toast 1/1/92 [OA 8332] [2]" 
            status="closed"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Cruise Guest List and Seating" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#sydney-guest-list"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Toast Text and Talking Points" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#sydney-toast-text"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
        </SeriesSection>
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
