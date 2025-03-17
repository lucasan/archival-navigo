
import React from 'react';
import { FileUnitStatus } from './types';
import ContainerNode from './ContainerNode';
import FileUnitNodeNoSeries from './FileUnitNodeNoSeries';
import ItemNode from './ItemNode';

interface CollectionIIContentProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const CollectionIIContent: React.FC<CollectionIIContentProps> = ({ searchTerm, statusFilter }) => {
  return (
    <div className="mb-6">
      <ContainerNode 
        title="Box 3" 
        containerType="Box" 
        containerNumber="3"
        containerId="23456"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNodeNoSeries 
          title="File Unit 1: Constitutional Convention Notes" 
          status="open"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Notes on the Constitutional Convention, May-September 1787" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Draft of Federalist No. 10, November 1787" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeNoSeries>
      </ContainerNode>
            
      <ContainerNode 
        title="Box 4" 
        containerType="Box" 
        containerNumber="4"
        containerId="78901"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNodeNoSeries 
          title="File Unit 2: Presidential Papers" 
          status="digitized"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="First Inaugural Address, March 4, 1809" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="War of 1812 Documents" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeNoSeries>
      </ContainerNode>
    </div>
  );
};

export default CollectionIIContent;
