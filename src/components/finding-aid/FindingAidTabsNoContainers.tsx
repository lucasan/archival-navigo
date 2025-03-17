
import React from 'react';
import CollectionStructureNoContainers from './CollectionStructureNoContainers';

interface FindingAidTabsNoContainersProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | 'open' | 'closed' | 'digitized';
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FindingAidTabsNoContainers: React.FC<FindingAidTabsNoContainersProps> = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter
}) => {
  return (
    <CollectionStructureNoContainers 
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      statusFilter={statusFilter}
      handleStatusFilter={handleStatusFilter}
    />
  );
};

export default FindingAidTabsNoContainers;
