
import React from 'react';
import { FileUnitStatus } from './types';
import SeriesSection from './SeriesSection';
import ContainerNode from './ContainerNode';
import FileUnitNode from './FileUnitNode';
import ItemNode from './ItemNode';

interface SeriesIIContentProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const SeriesIIContent: React.FC<SeriesIIContentProps> = ({ searchTerm, statusFilter }) => {
  return (
    <SeriesSection
      id="series-2"
      title="Series II: Political Documents, 1780-1817"
      description="Documents related to Madison's political career, including Constitutional Convention notes and presidential papers."
      extent="24 boxes (10.5 linear feet)"
      arrangement="By document type, then chronological"
      date="1780-1817"
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    >
      <ContainerNode 
        title="Box 3" 
        containerType="Box" 
        containerNumber="3"
        containerId="23456"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNode 
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
        </FileUnitNode>
      </ContainerNode>
            
      <ContainerNode 
        title="Box 4" 
        containerType="Box" 
        containerNumber="4"
        containerId="78901"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNode 
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
        </FileUnitNode>
      </ContainerNode>
    </SeriesSection>
  );
};

export default SeriesIIContent;
