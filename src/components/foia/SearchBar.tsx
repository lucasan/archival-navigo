
import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className="mb-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
        <h2 className="text-lg font-medium mb-2 text-slate-700">Search Finding Aids</h2>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <Input 
              type="text"
              placeholder="Search by case number, title, or subject matter..."
              className={cn(
                "pl-10 pr-24 py-6 border-slate-300 bg-slate-50 hover:bg-white focus:bg-white transition-colors",
                "text-slate-800 placeholder:text-slate-400 rounded-md shadow-sm",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary"
              )}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-3">
              {searchInput && (
                <Button 
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="text-sm h-8 hover:bg-slate-100 flex items-center"
                >
                  <RotateCcw size={14} className="mr-1" /> Clear
                </Button>
              )}
              <Button 
                type="submit"
                variant="default"
                size="sm"
                className="h-8 px-4 bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </div>
        </form>
        {/* Added fixed height container to prevent layout jumps */}
        <div className="h-6 mt-2">
          {searchInput && (
            <div className="text-xs text-slate-500 animate-fade-in">
              Searching for "{searchInput}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
