
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
      title="1980 Ronald Reagan/George Bush Presidential Campaign Files, August 1980–November 1980"
      scopeContent="This series contains statewide polls conducted for the Ronald Reagan/George Bush 1980 campaign. Also included are November 1980 post-election campaign magazines."
      extent="7 linear inches"
      arrangement="Arranged alphabetically by subject, and chronologically thereunder."
      date="August 1980–November 1980"
      accessRestriction="Restricted - Possibly"
      specificAccessRestriction="Donor Restricted"
      useRestriction="Restricted - Possibly"
      specificUseRestriction="Some or all of the records may be subject to copyright restrictions. Researchers should contact the publisher for further information."
      searchTerm={searchTerm}
      statusFilter={statusFilter}
    >
      <ContainerNode 
        title="Container ID 45732" 
        containerType="Box" 
        containerNumber="3"
        containerId="45732"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <FileUnitNode 
          title="Michigan [Statewide] Presidential Study - WAVE II - Data - 1980 [9/26-29/1980] [1]" 
          status="closed"
          naid="441677228"
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
        
        <FileUnitNode 
          title="Michigan Statewide - Data - August, 1980 [Prepared for Reagan/Bush Committee] [1]" 
          status="closed"
          naid="441677230"
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
        
        <FileUnitNode 
          title="Miscellaneous Campaign Material [November 1980 Post-Election Magazines: Newsweek, U.S. News & World Report, and Time]" 
          status="closed"
          naid="441677232"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Post-Election Analysis" 
            thumbnailUrl="/placeholder.svg"
            externalUrl="#"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Campaign Coverage Photographs" 
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
