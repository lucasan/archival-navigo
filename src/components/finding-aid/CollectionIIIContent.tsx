
import React from 'react';
import { FileUnitStatus } from './types';
import ContainerNode from './ContainerNode';
import FileUnitNodeNoSeries from './FileUnitNodeNoSeries';
import ItemNode from './ItemNode';

interface CollectionIIIContentProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const CollectionIIIContent: React.FC<CollectionIIIContentProps> = ({ searchTerm, statusFilter }) => {
  return (
    <div className="mb-6">
      <ContainerNode 
        title="Box 5" 
        containerType="Box" 
        containerNumber="5"
        containerId="34567"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNodeNoSeries 
          title="File Unit 1: Estate Accounts" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Montpelier Estate Ledger, 1810-1820" 
            thumbnailUrl="/placeholder.svg"
            naid="345678"
            scopeContent="Bound ledger containing detailed financial records of Madison's Montpelier plantation, including expenses for slave purchases, crop sales, and household maintenance. The 120-page volume provides comprehensive insights into the daily operations of an elite Virginia plantation and Madison's personal financial management during his presidency and early retirement years. Contains unique entries detailing interactions with Thomas Jefferson regarding shared agricultural experiments."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Legal Brief - Turnock v. Ragsdale" 
            thumbnailUrl="/placeholder.svg"
            naid="345679"
            scopeContent="A 25-page legal brief prepared for the 1989 Supreme Court case regarding abortion regulations in Illinois. The document includes detailed constitutional analysis, precedent citations, and Madison's personal annotations on the balance between state powers and individual liberties. Contains unique marginalia revealing Madison's evolving thoughts on federal versus state jurisdiction in matters of personal freedom."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeNoSeries>
      </ContainerNode>
            
      <ContainerNode 
        title="Oversized Drawer 1" 
        containerType="Drawer" 
        containerNumber="1"
        containerId="89012"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNodeNoSeries 
          title="File Unit 2: Personal Expenses" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Presidential Salary Account, 1809-1817" 
            thumbnailUrl="/placeholder.svg"
            naid="890123"
            scopeContent="Record of Madison's presidential salary payments and his personal expenditures while in office, including entertaining costs and travel expenses. This rare document provides a window into the lifestyle of an early American president, documenting everything from formal state dinners to personal purchases. Notable entries include expenditures related to the rebuilding of the White House after its burning in 1814."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeNoSeries>
      </ContainerNode>
    </div>
  );
};

export default CollectionIIIContent;
