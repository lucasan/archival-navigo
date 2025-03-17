
import React from 'react';
import { FileUnitStatus } from './types';
import SeriesSection from './SeriesSection';
import ContainerNode from './ContainerNode';
import FileUnitNode from './FileUnitNode';
import ItemNode from './ItemNode';

interface SeriesIIIContentProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const SeriesIIIContent: React.FC<SeriesIIIContentProps> = ({ searchTerm, statusFilter }) => {
  return (
    <SeriesSection
      id="series-3"
      title="Series III: Financial Records, 1780-1836"
      description="Madison's personal and estate financial records, including accounts, receipts, and property documents."
      extent="8 boxes (3.5 linear feet)"
      arrangement="By record type, then chronological"
      date="1780-1836"
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    >
      <ContainerNode 
        title="Box 5" 
        containerType="Box" 
        containerNumber="5"
        containerId="34567"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNode 
          title="File Unit 1: Estate Accounts" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Montpelier Estate Ledger, 1810-1820" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </ContainerNode>
            
      <ContainerNode 
        title="Oversized Drawer 1" 
        containerType="Drawer" 
        containerNumber="1"
        containerId="89012"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNode 
          title="File Unit 2: Personal Expenses" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          {/* Empty children element to satisfy the prop requirement */}
        </FileUnitNode>
      </ContainerNode>
    </SeriesSection>
  );
};

export default SeriesIIIContent;
