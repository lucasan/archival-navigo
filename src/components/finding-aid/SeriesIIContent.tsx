
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
          title="Container ID 45272" 
          containerType="Box" 
          containerNumber="1"
          containerId="45272"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <FileUnitNode 
            title="Abortion (Turnock V. Ragsdale) (Illinois Case)" 
            status="open"
            naid="286185847"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Legal Brief - Turnock v. Ragsdale" 
              thumbnailUrl="/placeholder.svg" 
              naid="286185848"
              scopeContent="Legal brief submitted to the Supreme Court regarding abortion regulations in Illinois. Contains detailed legal arguments about the constitutionality of state requirements for abortion clinics."
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Court Opinion Document" 
              thumbnailUrl="/placeholder.svg" 
              naid="286185850"
              scopeContent="Copy of the court's official published opinion with handwritten notes from Lee Liberman analyzing key legal points and potential policy implications."
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
          
          <FileUnitNode 
            title="Abortion (Webster v. Reproductive Health Services) [1]" 
            status="open"
            naid="286185849"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="Supreme Court Brief - Webster Case" 
              thumbnailUrl="/placeholder.svg" 
              naid="286185851"
              scopeContent="Official Supreme Court brief from the Webster case that established precedent for state regulations of abortion services and facilities. Includes marginalia from White House staff."
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Webster v. Reproductive Health Services Analysis" 
              thumbnailUrl="/placeholder.svg" 
              naid="286185852"
              scopeContent="Internal legal analysis by the White House Counsel's Office detailing the implications of the Webster decision on federal abortion policy and potential legislative responses."
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Policy Memorandum - Supreme Court Cases" 
              thumbnailUrl="/placeholder.svg" 
              naid="286185855"
              scopeContent="Confidential policy memorandum outlining the Bush Administration's strategy regarding abortion cases before the Supreme Court, including talking points for public statements."
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
          </FileUnitNode>
          
          <FileUnitNode 
            title="Abortion (State Laws)" 
            status="open"
            naid="286185853"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          >
            <ItemNode 
              title="State Legislation Overview" 
              thumbnailUrl="/placeholder.svg" 
              naid="286185856"
              scopeContent="Comprehensive review of abortion legislation across all 50 states as of 1990, categorized by type of restriction and constitutional status after Webster."
              searchTerm={searchTerm}
              statusFilter={statusFilter}
            />
            <ItemNode 
              title="Comparative Analysis of State Regulations" 
              thumbnailUrl="/placeholder.svg" 
              naid="286185857"
              scopeContent="Research document comparing different regulatory approaches to abortion across states, with special attention to waiting periods, parental consent, and facility requirements."
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
