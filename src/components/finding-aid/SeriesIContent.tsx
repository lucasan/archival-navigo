
import React from 'react';
import { FileUnitStatus } from './types';
import SeriesSection from './SeriesSection';
import ContainerNode from './ContainerNode';
import FileUnitNode from './FileUnitNode';
import ItemNode from './ItemNode';

interface SeriesIContentProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const SeriesIContent: React.FC<SeriesIContentProps> = ({ searchTerm, statusFilter }) => {
  return (
    <SeriesSection
      id="series-1"
      title="Series I: Personal Correspondence, 1770-1826"
      description="A comprehensive collection of Madison's personal letters to family members, friends, and colleagues."
      extent="12 boxes (5.2 linear feet)"
      arrangement="Chronological by year, then alphabetical by correspondent"
      date="1770-1826"
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    >
      <ContainerNode 
        title="Box 1" 
        containerType="Box" 
        containerNumber="1"
        containerId="12345"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNode 
          title="File Unit 1: Family Letters" 
          status="digitized"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Letter to Dolley Madison, June 15, 1789" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Letter from Father, August 3, 1782" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </ContainerNode>
            
      <ContainerNode 
        title="Box 2" 
        containerType="Box" 
        containerNumber="2"
        containerId="67890"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNode 
          title="File Unit 2: Correspondence with Friends" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Letter from Thomas Jefferson, May 12, 1790" 
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

export default SeriesIContent;
