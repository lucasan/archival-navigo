
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
            naid="123456"
            scopeContent="Four-page letter written by James Madison to his wife Dolley discussing domestic matters and local politics during his time in New York attending the First Congress. The letter contains intimate details about their relationship and Madison's thoughts on the early workings of the new government."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Letter from Father, August 3, 1782" 
            thumbnailUrl="/placeholder.svg"
            naid="123457"
            scopeContent="Two-page letter from James Madison Sr. to his son discussing plantation management and family affairs in Virginia during the Revolutionary War. The letter includes discussions about crop yields, slave management, and the family's financial situation during wartime."
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
            naid="123458"
            scopeContent="Three-page letter from Thomas Jefferson discussing political philosophy and the drafting of the Bill of Rights, with particular attention to religious liberty. The letter reveals Jefferson's thinking on separation of church and state and includes personal reflections on their friendship and collaboration."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </ContainerNode>
    </SeriesSection>
  );
};

export default SeriesIContent;
