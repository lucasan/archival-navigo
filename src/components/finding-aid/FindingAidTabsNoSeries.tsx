
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccordionDetails from './AccordionDetails';
import CollectionStructureNoSeries from './CollectionStructureNoSeries';

interface AccordionSection {
  title: string;
  content: React.ReactNode;
}

interface FindingAidTabsNoSeriesProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  accordionSections: AccordionSection[];
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | 'open' | 'closed' | 'digitized';
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FindingAidTabsNoSeries: React.FC<FindingAidTabsNoSeriesProps> = ({
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
          <TabsTrigger value="collection" className="finding-aid-tab whitespace-nowrap">
            Collection Structure
          </TabsTrigger>
          <TabsTrigger value="details" className="finding-aid-tab whitespace-nowrap">
            Finding Aid Details
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="collection" className="mt-0 p-0">
        <CollectionStructureNoSeries 
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

export default FindingAidTabsNoSeries;
