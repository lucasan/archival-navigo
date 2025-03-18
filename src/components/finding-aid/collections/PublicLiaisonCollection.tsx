
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
            externalUrl="#vietnamese-conference-materials"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Attendee List and Correspondence" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#vietnamese-conference-attendees"
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
            externalUrl="#holocaust-tour-schedule"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Interfaith Council Meeting Notes" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#holocaust-meeting-notes"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Memorial Council Background Information" 
            thumbnailUrl="/placeholder.svg" 
            externalUrl="#holocaust-council-background"
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </SeriesSection>
    </>
  );
};

export default PublicLiaisonCollection;
