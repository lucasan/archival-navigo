
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchControls from './SearchControls';
import { FileUnitStatus } from './types';
import { TreeProvider, useTreeContext } from './TreeContext';
import FileUnitNodeDirectAccess from './FileUnitNodeDirectAccess';
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
        {/* Series I File Units - Direct Access */}
        <FileUnitNodeDirectAccess 
          title="File Unit 1: Correspondence with Jefferson, 1780-1826" 
          status="digitized"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Letter to Thomas Jefferson, July 1791" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#letter-jefferson-1791"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Letter from Thomas Jefferson, August 1791" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#letter-from-jefferson-1791"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Notes on Jefferson's Constitutional Views, 1798" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#jefferson-notes-1798"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeDirectAccess>
        
        <FileUnitNodeDirectAccess 
          title="File Unit 2: Correspondence with Monroe, 1786-1820" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Letter to James Monroe, March 1786" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#letter-monroe-1786"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Diplomatic Notes from Monroe, 1803" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#monroe-notes-1803"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeDirectAccess>

        {/* Series II File Units - Direct Access */}
        <FileUnitNodeDirectAccess 
          title="File Unit 3: Montpelier Renovation Plans, 1797-1812" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Architectural Drawings, 1797" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#drawings-1797"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Builder Correspondence, 1809" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#builder-1809"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Expense Ledger for Renovations, 1810-1812" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#expenses-1810"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeDirectAccess>
        
        <FileUnitNodeDirectAccess 
          title="File Unit 4: Virginia Land Deeds, 1760-1836" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Orange County Property Deed, 1760" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#deed-1760"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Montpelier Estate Deed, 1797" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#montpelier-deed-1797"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeDirectAccess>
        
        {/* Series III File Units - Direct Access */}
        <FileUnitNodeDirectAccess 
          title="File Unit 5: Estate Accounts" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Plantation Account Books, 1790-1800" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#accounts-1790"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Household Expense Ledger, 1801-1810" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#expenses-1801"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Staff Payment Records, 1805-1815" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#staff-records-1805"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeDirectAccess>
        
        <FileUnitNodeDirectAccess 
          title="File Unit 6: Personal Expenses" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Travel Expenses, 1807-1809" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#travel-1807"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Book Purchase Records, 1810-1820" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#books-1810"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeDirectAccess>
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
