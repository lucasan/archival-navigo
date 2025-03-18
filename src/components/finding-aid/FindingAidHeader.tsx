
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
        
        {isFoiaPage ? (
          <div className="flex flex-col text-xs sm:text-sm text-muted-foreground mb-2 md:mb-3">
            <span className="mb-1">
              Processed by:
              <span className="font-medium text-foreground">
                {' Staff Archivists, March - September 1998. Previously restricted materials are added as they are released.'}
              </span>
            </span>
            <span>
              FOIA Number:
              <span className="font-medium text-foreground">
                {' 1998-0099-F'}
              </span>
            </span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:gap-x-6 text-xs sm:text-sm text-muted-foreground mb-2 md:mb-3">
            <span className="mb-1 sm:mb-0">
              Collection ID:
              <span className="font-medium text-foreground">
                {` ${collectionId}`}
              </span>
            </span>
            <span>
              Acquisition Date:
              <span className="font-medium text-foreground">
                {` ${acquisitionDate}`}
              </span>
            </span>
          </div>
        )}
        
        <div className="flex justify-end">
          <a 
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm hover:text-primary transition-colors"
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
