
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchInput, 
  setSearchInput, 
  handleSearch, 
  clearSearch 
}) => {
  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <Input 
          type="text"
          placeholder="Search by case number or subject..."
          className="pl-10 pr-24"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && (
          <button
            type="button"
            className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchInput('')}
            aria-label="Clear input"
          >
            <X size={16} />
          </button>
        )}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-1">
          {searchInput && (
            <Button 
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="text-sm h-8"
            >
              Clear
            </Button>
          )}
          <Button 
            type="submit"
            variant="default"
            size="sm"
            className="h-8"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
