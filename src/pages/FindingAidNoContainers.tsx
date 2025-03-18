
import React, { useState } from 'react';
import FindingAidHeader from '@/components/finding-aid/FindingAidHeader';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import FindingAidSidebar from '@/components/finding-aid/FindingAidSidebar';
import CollectionOverview from '@/components/finding-aid/CollectionOverview';
import FindingAidTabsNoContainers from '@/components/finding-aid/FindingAidTabsNoContainers';

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

  // Bush Presidential Library Collection Description
  const collectionDescription = [
    "The Records of the White House Office of Speechwriting consists of materials created and accumulated by the speechwriting staff during the George H. W. Bush Administration (1989-1993).",
    "This collection contains speech drafts, speech backup materials, presidential remarks, press releases, and other public statements. The collection is especially rich in documenting the collaborative effort that went into crafting Presidential addresses on important domestic and foreign policy issues of the Bush Administration.",
    "Researchers interested in foreign policy, domestic initiatives, and the rhetorical presidency will find this collection particularly valuable for understanding how the administration shaped its message and communicated with the American public and international audiences during significant historical events including the end of the Cold War, the Gulf War, and economic policy debates."
  ];

  const collectionHighlights = [
    { text: "Presidential Speeches with Handwritten Notes" },
    { text: "Gulf War Address Drafts and Background Materials" },
    { text: "Berlin Wall and German Reunification Remarks" },
    { text: "Major Domestic Policy Initiative Announcements" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header at the top */}
      <NavigationHeader />
      
      {/* Header Section */}
      <FindingAidHeader 
        collectionName="Records of the White House Office of Speechwriting"
        collectionId="GB-SPE"
        acquisitionDate="01/20/1993"
        sourceUrl="https://example.org/archive/bush-speechwriting"
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <main className="container px-4 mx-auto py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Main Content (75%) */}
          <div className={`w-full lg:w-3/4 animate-slide-in order-first transition-all duration-300 ${sidebarVisible ? 'lg:w-3/4' : 'lg:w-full'}`}>
            {/* Overview Section */}
            <CollectionOverview description={collectionDescription} />

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
            highlights={collectionHighlights}
          />
        </div>
      </main>
    </div>
  );
};

export default FindingAidNoContainers;
