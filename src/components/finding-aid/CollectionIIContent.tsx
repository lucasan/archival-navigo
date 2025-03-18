
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
            naid="234567"
            scopeContent="Madison's handwritten notes documenting the debates and proceedings of the Constitutional Convention in Philadelphia, including detailed accounts of discussions on representation and executive power. These notes are considered the most comprehensive contemporary record of the Convention debates and show Madison's central role in shaping the U.S. Constitution. The document includes personal marginalia and observations not found in official records."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Draft of Federalist No. 10, November 1787" 
            thumbnailUrl="/placeholder.svg"
            naid="234568"
            scopeContent="Original draft manuscript of Madison's influential Federalist Paper No. 10, discussing the dangers of factions and the benefits of a republican government. Contains handwritten revisions, deletions, and additions that reveal Madison's thought process during composition. Several passages differ significantly from the published version, providing insight into the evolution of his political theory."
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
            naid="789012"
            scopeContent="Manuscript copy of Madison's First Inaugural Address delivered upon assuming the presidency, outlining his vision for the nation and commitment to republican principles and constitutional governance. The document includes several revisions that were made during the drafting process, showing Madison's careful attention to rhetoric and political messaging at this crucial moment in his career."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="War of 1812 Documents" 
            thumbnailUrl="/placeholder.svg"
            naid="789013"
            scopeContent="Collection of documents related to the War of 1812, including Madison's war message to Congress, strategic planning documents, and correspondence with military commanders. These papers reveal Madison's struggle to effectively lead the nation during wartime and contain candid assessments of military capabilities and diplomatic challenges. Includes personal notes expressing doubts and concerns not shared publicly."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNodeNoSeries>
      </ContainerNode>
    </div>
  );
};

export default CollectionIIContent;
