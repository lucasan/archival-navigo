
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftRight, Search, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigationHeader: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 flex justify-center">
        <div className="flex items-center space-x-4 text-sm font-medium">
          <Link 
            to="/foia-finding-aids-listing"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors",
              path === '/foia-finding-aids-listing'
                ? "bg-white shadow-sm text-primary" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
            )}
          >
            <FileText className="h-4 w-4 mr-1" />
            FOIA Finding Aids Listing
          </Link>
          
          <ArrowLeftRight className="h-4 w-4 text-gray-400" />
          
          <Link 
            to="/finding-aid"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors",
              path === '/finding-aid'
                ? "bg-white shadow-sm text-primary" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
            )}
          >
            Textual Finding Aid
          </Link>
          
          <ArrowLeftRight className="h-4 w-4 text-gray-400" />
          
          <Link 
            to="/finding-aid-no-containers"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors",
              path === '/finding-aid-no-containers'
                ? "bg-white shadow-sm text-primary" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
            )}
          >
            FOIA Finding Aid
          </Link>
          
          <ArrowLeftRight className="h-4 w-4 text-gray-400" />
          
          <Link 
            to="/research-room-search"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors",
              path === '/research-room-search'
                ? "bg-white shadow-sm text-primary" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
            )}
          >
            <Search className="h-4 w-4 mr-1" />
            Research Room Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
