
import React from 'react';
import SeriesSection from '../SeriesSection';
import FileUnitNode from '../FileUnitNode';
import ItemNode from '../ItemNode';
import { FileUnitStatus } from '../types';

interface ScienceTechnologyCollectionProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const ScienceTechnologyCollection: React.FC<ScienceTechnologyCollectionProps> = ({ 
  searchTerm, 
  statusFilter 
}) => {
  return (
    <>
      <div className="font-bold text-base sm:text-lg mt-8 mb-2">
        GB-SCT: Records of the White House Office of Science and Technology (George H. W. Bush Administration)
      </div>
      
      <SeriesSection
        id="allan-bromley"
        title="Allan D. Bromley's Subject Files"
        description="Subject files maintained by Allan D. Bromley, Science Advisor to the President and Director of the Office of Science and Technology Policy."
        extent="8 linear feet (19 boxes)"
        arrangement="Alphabetical by subject"
        date="1989-1993"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        hideMetadata={true}
      >
        <FileUnitNode 
          title="International - Russia [1990]" 
          status="open"
          naid="285792187"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="US-Russia Scientific Exchange Proposal" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#russia-scientific-exchange"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Moscow Meeting Briefing Papers" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#russia-meeting-papers"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="International: Japan [2 of 3] [1991]" 
          status="digitized"
          naid="285792157"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Japan-US Science and Technology Agreement" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#japan-agreement-1991"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Technology Transfer Issues" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#japan-tech-transfer"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="International Countries, White House: Japan [1992]" 
          status="closed"
          naid="285792161"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="High-Energy Physics Collaboration Proposal" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#japan-physics-proposal"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Tokyo Summit Science Agenda" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#japan-summit-agenda"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Bilateral Research Initiative Funding" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#japan-research-funding"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </SeriesSection>
    </>
  );
};

export default ScienceTechnologyCollection;
