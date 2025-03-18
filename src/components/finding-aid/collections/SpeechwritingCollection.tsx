
import React from 'react';
import SeriesSection from '../SeriesSection';
import FileUnitNode from '../FileUnitNode';
import ItemNode from '../ItemNode';
import { FileUnitStatus } from '../types';

interface SpeechwritingCollectionProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const SpeechwritingCollection: React.FC<SpeechwritingCollectionProps> = ({ 
  searchTerm, 
  statusFilter 
}) => {
  return (
    <>
      <div className="font-bold text-base sm:text-lg mt-4 mb-2">
        GB-SPE: Records of the White House Office of Speechwriting (George H. W. Bush Administration)
      </div>
      
      <SeriesSection
        id="speech-backup"
        title="Speech Backup Chronological Files"
        description="Files containing backup materials for speeches delivered by President George H. W. Bush, arranged chronologically."
        extent="10 linear feet (24 boxes)"
        arrangement="Chronological by speech date"
        date="1989-1993"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        hideMetadata={true}
      >
        <FileUnitNode 
          title="Black History Month, 2/25/91 [OA 6855] [2]" 
          status="open"
          naid="415892573"
          containerId="13747"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Drafts with Presidential Annotations" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#black-history-draft"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Background Materials and Research" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#black-history-materials"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Final Speech and Delivery Notes" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#black-history-final"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="Somalia Address 12/31/92 [OA 7583]" 
          status="digitized"
          naid="323154355"
          containerId="13842"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Somalia Situation Report" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#somalia-report"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Somalia Operations Plan" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#somalia-plan"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="Australian Parliament 1/2/92 [OA 8332] [3]" 
          status="digitized"
          naid="323153744"
          containerId="13788"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Australian-American Relations Brief" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#australia-brief"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Parliament Protocol Guide" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#parliament-protocol"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Final Address with Annotations" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#australia-address-final"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="Sydney--Luncheon Cruise Toast 1/1/92 [OA 8332] [2]" 
          status="closed"
          naid="323153740"
          containerId="13788"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Cruise Guest List and Seating" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#sydney-guest-list"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Toast Text and Talking Points" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#sydney-toast-text"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </SeriesSection>
      
      <SeriesSection
        id="mary-kate-grant"
        title="Mary Kate Grant's Subject Files"
        description="Subject files maintained by speechwriter Mary Kate Grant, arranged by topic."
        extent="4 linear feet (10 boxes)"
        arrangement="Alphabetical by subject"
        date="1989-1991"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        hideMetadata={true}
      >
        <FileUnitNode 
          title="National Energy Strategy 7/24/91 [OA 4424]" 
          status="open"
          naid="323154707"
          containerId="13882"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Energy Policy Briefing Documents" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#energy-briefing"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Energy Strategy Speech Draft" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#energy-draft"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="NASA 4/28/89 [OA 4423]" 
          status="digitized"
          naid="323154705"
          containerId="13882"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Space Program Notes" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#nasa-notes"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="NASA Funding Speech Draft" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#nasa-draft"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Space Exploration Vision Statement" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#space-vision"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="Visit to Greece and Turkey 7/91 [OA 4424]" 
          status="closed"
          naid="323154678"
          containerId="13880"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Mediterranean Foreign Policy Briefing" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#mediterranean-briefing"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Greece State Dinner Toast" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#greece-toast"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Turkey Visit Talking Points" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#turkey-talking-points"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </SeriesSection>
    </>
  );
};

export default SpeechwritingCollection;
