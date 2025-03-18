
import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
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
            {searchInput && (
              <button
                type="button"
                className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
                  className="text-sm h-8 hover:bg-slate-100"
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
        {searchInput && (
          <div className="mt-2 text-xs text-slate-500 animate-fade-in">
            Searching for "{searchInput}"
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button 
            onClick={() => {
              setSearchInput('Budget Policy');
              document.forms[0].dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-full text-slate-700 transition-colors"
          >
            Budget Policy
          </button>
          <button 
            onClick={() => {
              setSearchInput('Foreign Affairs');
              document.forms[0].dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-full text-slate-700 transition-colors"
          >
            Foreign Affairs
          </button>
          <button 
            onClick={() => {
              setSearchInput('National Security');
              document.forms[0].dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-full text-slate-700 transition-colors"
          >
            National Security
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
