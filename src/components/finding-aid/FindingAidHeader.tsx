
import React from 'react';
import { ExternalLink, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface FindingAidHeaderProps {
  collectionName: string;
  collectionId: string;
  acquisitionDate: string;
  sourceUrl: string;
  toggleSidebar: () => void;
}

const FindingAidHeader: React.FC<FindingAidHeaderProps> = ({
  collectionName,
  collectionId,
  acquisitionDate,
  sourceUrl,
  toggleSidebar
}) => {
  const location = useLocation();
  const isFoiaPage = location.pathname === '/finding-aid-no-containers';
  
  return (
    <header className="border-b border-border bg-white shadow-sm animate-fade-in">
      <div className="container px-4 py-4 sm:py-6 md:py-8 mx-auto">
        <div className="flex justify-between items-center mb-2 md:mb-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            {collectionName}
          </h1>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row sm:gap-x-6 mb-2 md:mb-0">
            <span className="mb-1 sm:mb-0">
              {isFoiaPage ? 'FOIA Number:' : 'Collection ID:'} 
              <span className="font-medium text-foreground">
                {isFoiaPage ? ' 1998-0099-F' : ` ${collectionId}`}
              </span>
            </span>
            <span>
              {isFoiaPage ? 'Processed by:' : 'Acquisition Date:'} 
              <span className="font-medium text-foreground">
                {isFoiaPage 
                  ? ' Staff Archivists, March - September 1998. Previously restricted materials are added as they are released.' 
                  : ` ${acquisitionDate}`}
              </span>
            </span>
          </div>
          <a 
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            View Original Source
            <ExternalLink size={14} className="inline" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default FindingAidHeader;
