
import React, { useState } from 'react';
import FindingAidHeader from '@/components/finding-aid/FindingAidHeader';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import FindingAidSidebar from '@/components/finding-aid/FindingAidSidebar';
import CollectionOverview from '@/components/finding-aid/CollectionOverview';
import FindingAidTabsNoContainers from '@/components/finding-aid/FindingAidTabsNoContainers';
import { collectionData } from '@/components/finding-aid/constants';

const FindingAidNoContainers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed' | 'digitized'>('all');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as 'all' | 'open' | 'closed' | 'digitized');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // FOIA Page-specific content
  const foiaDescription = [
    "The materials in FOIA 1998-0099-F are a selective, not necessarily all inclusive, body of documents responsive to the topic of the FOIA. Researchers should consult the archivist about related materials.",
    "FOIA 1998-0099-F contains materials related to the diplomatic and military response by the United States (as part of a multi-national force) to the Iraqi invasion of Kuwait on August 2, 1990. The first part of the intervention, Operation Desert Shield, took place between September 1990 and January 1991. During this operation the U.S. and a coalition of other nations committed forces to protect Saudi Arabia from further 1998-0099-F 2 Iraqi aggression. The military campaign to drive Iraq out of Kuwait, Operation Desert Storm, commenced on January 16, 1991, immediately following the expiration of a UN Security Council Resolution demanding the unconditional withdrawal of Iraqi forces.",
    "White House Office of Records Management (WHORM) Subject File categories contain correspondence, memoranda, news clippings, and brochures from the general public, Congress, and the Bush administration. WHORM Subject File categories CO072 and CO083 contain documents concerning Iraq and Kuwait, respectively. Most of the material in these categories concerns Iraq's invasion of Kuwait. Another large segment related to this subject is WHORM Subject File category ND016.",
    "The Staff and Office Files contain correspondence, memoranda, and publications maintained by individual staff members and offices. A significant amount of material responsive to this FOIA is contained in the files of the National Security Council (NSC). Although these files are listed, it should be noted that most of these documents are security classified and have been closed under the restrictions of the Freedom of Information Act. These documents deal with topics such as: the inspection and elimination of Iraq's weapons of mass destruction; diplomatic efforts to create the Gulf Coalition; United States policy towards Iraq prior to the conflict; United States efforts to assist Kurdish refugees; and military operations in the Persian Gulf Theater."
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header at the top */}
      <NavigationHeader />
      
      {/* Header Section */}
      <FindingAidHeader 
        collectionName="Records on the Persian Gulf Conflict"
        collectionId={collectionData.id}
        acquisitionDate={collectionData.acquisitionDate}
        sourceUrl={collectionData.sourceUrl}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <main className="container px-4 mx-auto py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Main Content (75%) */}
          <div className={`w-full lg:w-3/4 animate-slide-in order-first transition-all duration-300 ${sidebarVisible ? 'lg:w-3/4' : 'lg:w-full'}`}>
            {/* Overview Section */}
            <CollectionOverview description={foiaDescription} />

            {/* Collection Structure (without containers) */}
            <FindingAidTabsNoContainers 
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              statusFilter={statusFilter}
              handleStatusFilter={handleStatusFilter}
            />
          </div>

          {/* Sidebar (25%) */}
          <FindingAidSidebar 
            isVisible={sidebarVisible}
            highlights={collectionData.collectionHighlights}
          />
        </div>
      </main>
    </div>
  );
};

export default FindingAidNoContainers;
