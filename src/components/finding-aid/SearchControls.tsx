
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FileUnitStatus } from './types';

interface SearchControlsProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: 'all' | FileUnitStatus;
  handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchControls: React.FC<SearchControlsProps> = ({
  searchTerm,
  handleSearch,
  statusFilter,
  handleStatusFilter
}) => {
  return (
    <div className="mb-4 md:mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="relative w-full sm:w-1/2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <input 
          type="text" 
          className="bg-background border border-input rounded-md py-1.5 sm:py-2 pl-10 pr-4 w-full text-sm focus:ring-2 focus:ring-ring focus:outline-none" 
          placeholder="Search series, file units, and items..." 
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter size={16} className="text-muted-foreground" />
        <span className="text-xs sm:text-sm font-medium">Status:</span>
        <select 
          className="bg-background border border-input rounded-md py-1.5 sm:py-2 px-2 sm:px-3 focus:ring-2 focus:ring-ring focus:outline-none text-xs sm:text-sm"
          value={statusFilter}
          onChange={handleStatusFilter}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="digitized">Digitized</option>
        </select>
      </div>
    </div>
  );
};

export default SearchControls;
