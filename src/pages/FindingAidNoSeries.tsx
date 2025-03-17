
import React, { useState } from 'react';
import FindingAidHeader from '@/components/finding-aid/FindingAidHeader';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import FindingAidSidebar from '@/components/finding-aid/FindingAidSidebar';
import CollectionOverview from '@/components/finding-aid/CollectionOverview';
import FindingAidTabsNoSeries from '@/components/finding-aid/FindingAidTabsNoSeries';
import { collectionData } from '@/components/finding-aid/constants';

const FindingAidNoSeries: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header at the top */}
      <NavigationHeader />
      
      {/* Header Section */}
      <FindingAidHeader 
        collectionName={collectionData.name}
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
            <CollectionOverview description={collectionData.description} />

            {/* Collection Structure (without tabs now) */}
            <FindingAidTabsNoSeries 
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              statusFilter={statusFilter}
              handleStatusFilter={handleStatusFilter}
            />
          </div>

          {/* Sidebar (25%) - with series navigation removed */}
          <FindingAidSidebar 
            isVisible={sidebarVisible}
            highlights={collectionData.collectionHighlights}
          />
        </div>
      </main>
    </div>
  );
};

export default FindingAidNoSeries;
