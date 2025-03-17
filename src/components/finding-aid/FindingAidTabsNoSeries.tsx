
import React from 'react';
import CollectionStructureNoSeries from './CollectionStructureNoSeries';

interface FindingAidTabsNoSeriesProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | 'open' | 'closed' | 'digitized';
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FindingAidTabsNoSeries: React.FC<FindingAidTabsNoSeriesProps> = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter
}) => {
  return (
    <CollectionStructureNoSeries 
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      statusFilter={statusFilter}
      handleStatusFilter={handleStatusFilter}
    />
  );
};

export default FindingAidTabsNoSeries;
