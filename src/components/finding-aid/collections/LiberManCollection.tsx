
import React from 'react';
import SeriesSection from '../SeriesSection';
import FileUnitNode from '../FileUnitNode';
import ItemNode from '../ItemNode';
import { FileUnitStatus } from '../types';

interface LiberManCollectionProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const LiberManCollection: React.FC<LiberManCollectionProps> = ({ 
  searchTerm, 
  statusFilter 
}) => {
  return (
    <>
      <div id="liberman-counsel" className="font-bold text-base sm:text-lg mt-8 mb-2">
        GB-COU: Records of the White House Counsel's Office (George H. W. Bush Administration)
      </div>
      
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
      </SeriesSection>
    </>
  );
};

export default LiberManCollection;
