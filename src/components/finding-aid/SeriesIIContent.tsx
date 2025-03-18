import React from 'react';
import { FileUnitStatus } from './types';
import SeriesSection from './SeriesSection';
import ContainerNode from './ContainerNode';
import FileUnitNode from './FileUnitNode';

interface SeriesIIContentProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const SeriesIIContent: React.FC<SeriesIIContentProps> = ({ searchTerm, statusFilter }) => {
  return (
    <>
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
          />
          
          <FileUnitNode 
            title="Michigan Statewide - Data - August, 1980 [Prepared for Reagan/Bush Committee] [1]" 
            status="closed"
            naid="441677230"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          
          <FileUnitNode 
            title="Miscellaneous Campaign Material [November 1980 Post-Election Magazines: Newsweek, U.S. News & World Report, and Time]" 
            status="closed"
            naid="441677232"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </ContainerNode>
      </SeriesSection>
      
      <SeriesSection
        id="lee-liberman"
        title="Lee S. Liberman's General Subject Files, January 20, 1989–January 20, 1993"
        scopeContent="This series contains correspondence between individuals, organizations, Lee Liberman, and other Counsel Office staff members."
        arrangement="Arranged alphabetically."
        date="January 20, 1989–January 20, 1993"
        accessRestriction="Restricted - Possibly"
        specificAccessRestriction="Freedom of Information Act (FOIA), Presidential Records Act (PRA)"
        useRestriction="Unrestricted"
        extent="40 linear feet, 9 linear inches"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      >
        <ContainerNode 
          title="Container ID 56789" 
          containerType="Box" 
          containerNumber="1"
          containerId="56789"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <FileUnitNode 
            title="Ethics in Government [1 of 3]" 
            status="closed"
            naid="486123789"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Executive Branch Ethics Reform Proposal" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#ethics-reform-proposal"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="White House Ethics Guidance Memo" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#ethics-guidance-memo"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
          
          <FileUnitNode 
            title="Conflicts of Interest Guidelines" 
            status="open"
            naid="486123791"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Federal Conflicts of Interest Statutes Summary" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#conflicts-statutes-summary"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Recusal Procedures for White House Staff" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#recusal-procedures"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
        </ContainerNode>
        
        <ContainerNode 
          title="Container ID 56790" 
          containerType="Box" 
          containerNumber="2"
          containerId="56790"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <FileUnitNode 
            title="Presidential Records Act Implementation" 
            status="digitized"
            naid="486123795"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Records Management Memorandum" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#records-management-memo"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="PRA Compliance Training Materials" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#pra-training-materials"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Record Retention Schedule" 
              thumbnailUrl="/placeholder.svg" 
              externalUrl="#retention-schedule"
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
        </ContainerNode>
      </SeriesSection>
    </>
  );
};

export default SeriesIIContent;
