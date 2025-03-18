
import React from 'react';
import { FileUnitStatus } from './types';
import ContainerNode from './ContainerNode';
import FileUnitNodeNoSeries from './FileUnitNodeNoSeries';
import ItemNode from './ItemNode';

interface CollectionIContentProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const CollectionIContent: React.FC<CollectionIContentProps> = ({ searchTerm, statusFilter }) => {
  return (
    <div className="mb-6">
      <ContainerNode 
        title="Box 1" 
        containerType="Box" 
        containerNumber="1"
        containerId="12345"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNodeNoSeries 
          title="File Unit 1: Family Letters" 
          status="digitized"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Letter to Dolley Madison, June 15, 1789" 
            thumbnailUrl="/placeholder.svg"
            naid="123456"
            scopeContent="Four-page letter written by James Madison to his wife Dolley discussing domestic matters and local politics during his time in New York attending the First Congress. Contains references to their newly established household and Madison's hopes for the young nation."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Letter from Father, August 3, 1782" 
            thumbnailUrl="/placeholder.svg"
            naid="123457"
            scopeContent="Two-page letter from James Madison Sr. to his son discussing plantation management and family affairs in Virginia during the Revolutionary War. Includes details about harvest expectations and local reactions to the conflict with Britain."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeNoSeries>
      </ContainerNode>
            
      <ContainerNode 
        title="Box 2" 
        containerType="Box" 
        containerNumber="2"
        containerId="67890"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNodeNoSeries 
          title="File Unit 2: Correspondence with Friends" 
          status="closed"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Letter from Thomas Jefferson, May 12, 1790" 
            thumbnailUrl="/placeholder.svg"
            naid="123458"
            scopeContent="Three-page letter from Thomas Jefferson discussing political philosophy and the drafting of the Bill of Rights, with particular attention to religious liberty. Jefferson analyzes several constitutional amendments and offers candid opinions on congressional debates."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeNoSeries>
      </ContainerNode>
    </div>
  );
};

export default CollectionIContent;
