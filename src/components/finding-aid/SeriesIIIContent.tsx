
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
            naid="345678"
            scopeContent="Bound ledger containing detailed financial records of Madison's Montpelier plantation, including expenses for slave purchases, crop sales, and household maintenance. The ledger contains meticulously kept records of agricultural production, showing the transition from tobacco to wheat cultivation. Several pages detail Madison's experimental farming methods influenced by European agricultural treatises."
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
          <ItemNode 
            title="Presidential Salary Account, 1809-1817" 
            thumbnailUrl="/placeholder.svg"
            naid="890123"
            scopeContent="Record of Madison's presidential salary payments and his personal expenditures while in office, including entertaining costs and travel expenses. This financial journal shows Madison's conservative personal spending habits contrasted with the necessary expenditures for maintaining presidential dignity. Contains interesting entries related to the acquisition of books, scientific instruments, and fine wines that reflect Madison's intellectual and cultural interests."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </ContainerNode>
    </SeriesSection>
  );
};

export default SeriesIIIContent;
