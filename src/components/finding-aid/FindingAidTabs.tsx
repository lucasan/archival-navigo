
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccordionDetails from './AccordionDetails';
import CollectionStructure from './CollectionStructure';

interface AccordionSection {
  title: string;
  content: React.ReactNode;
}

interface FindingAidTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  accordionSections: AccordionSection[];
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | 'open' | 'closed' | 'digitized';
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FindingAidTabs: React.FC<FindingAidTabsProps> = ({
  activeTab,
  setActiveTab,
  accordionSections,
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter
}) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-start w-full">
        <TabsList className="mb-4 md:mb-6 bg-muted overflow-x-auto w-auto">
          <TabsTrigger value="series" className="finding-aid-tab whitespace-nowrap">
            Series & File Units
          </TabsTrigger>
          <TabsTrigger value="details" className="finding-aid-tab whitespace-nowrap">
            Finding Aid Details
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="series" className="mt-0 p-0">
        <CollectionStructure 
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          statusFilter={statusFilter}
          handleStatusFilter={handleStatusFilter}
        />
      </TabsContent>

      <TabsContent value="details" className="mt-0 p-0">
        <div className="bg-white rounded-lg border shadow-sm p-1">
          <AccordionDetails sections={accordionSections} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FindingAidTabs;
