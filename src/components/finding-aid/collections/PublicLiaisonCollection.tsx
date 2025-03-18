
import React from 'react';
import SeriesSection from '../SeriesSection';
import FileUnitNode from '../FileUnitNode';
import ItemNode from '../ItemNode';
import { FileUnitStatus } from '../types';

interface PublicLiaisonCollectionProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const PublicLiaisonCollection: React.FC<PublicLiaisonCollectionProps> = ({ 
  searchTerm, 
  statusFilter 
}) => {
  return (
    <>
      <div id="public-liaison" className="font-bold text-base sm:text-lg mt-8 mb-2">
        GB-PUL: Records of the White House Office of Public Liaison (George H. W. Bush Administration)
      </div>
      
      <SeriesSection
        id="clayton-fong"
        title="Clayton Fong's Files"
        description="Files maintained by Clayton Fong as Special Assistant to the President for Public Liaison."
        extent="3 linear feet (7 boxes)"
        arrangement="Alphabetical by subject"
        date="1989-1992"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        hideMetadata={true}
      >
        <FileUnitNode 
          title="National Vietnamese Community Conference, May 2" 
          status="open"
          naid="286186089"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Conference Agenda and Briefing Materials" 
            thumbnailUrl="/placeholder.svg" 
            naid="286186090"
            scopeContent="Printed agenda, participant list, and briefing papers for the National Vietnamese American Community Conference held at the White House on May 2, 1992. Includes speech drafts and background information."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Attendee List and Correspondence" 
            thumbnailUrl="/placeholder.svg" 
            naid="286186091"
            scopeContent="Complete list of conference attendees with contact information, biographical notes, and pre-conference correspondence with community leaders. Includes handwritten annotations by White House staff."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </SeriesSection>
      
      <SeriesSection
        id="kathy-jeavons"
        title="Kathy Jeavons' Subject Files"
        description="Subject files maintained by Kathy Jeavons, Special Assistant to the President for Public Liaison."
        extent="5 linear feet (12 boxes)"
        arrangement="Alphabetical by subject"
        date="1989-1993"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        hideMetadata={true}
      >
        <FileUnitNode 
          title="U.S. Holocaust Memorial Council: Tour - Interfaith Council of the Holocaust - 8/7" 
          status="digitized"
          naid="286186053"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Tour Schedule and Coordination Documents" 
            thumbnailUrl="/placeholder.svg" 
            naid="286186054"
            scopeContent="Schedule and logistics documents for the Interfaith Council tour of the Holocaust Memorial Museum construction site on August 7, 1991. Includes security protocols and coordination with Secret Service."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Interfaith Council Meeting Notes" 
            thumbnailUrl="/placeholder.svg" 
            naid="286186055"
            scopeContent="Handwritten and typed notes from the Interfaith Council meeting held after the museum tour, documenting discussions about religious representation in Holocaust commemoration and educational programs."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Memorial Council Background Information" 
            thumbnailUrl="/placeholder.svg" 
            naid="286186056"
            scopeContent="Background materials on the U.S. Holocaust Memorial Council, including its legislative history, mission statement, and current membership. Prepared for White House staff preparing for the Council visit."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </SeriesSection>
    </>
  );
};

export default PublicLiaisonCollection;
