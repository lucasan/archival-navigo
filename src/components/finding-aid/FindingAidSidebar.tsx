
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from 'lucide-react';

interface CollectionHighlight {
  text: string;
}

interface FindingAidSidebarProps {
  isVisible: boolean;
  highlights: CollectionHighlight[];
  showSeriesNavigation?: boolean;
}

const FindingAidSidebar: React.FC<FindingAidSidebarProps> = ({ 
  isVisible,
  highlights,
  showSeriesNavigation = false
}) => {
  return (
    <div className={`${isVisible ? 'block' : 'hidden lg:block'} w-full lg:w-1/4 flex-shrink-0 animate-fade-in order-last`}>
      <div className="sticky top-4 space-y-4 md:space-y-6">
        <aside className="bg-white rounded-lg border shadow-sm p-4 md:p-5 mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Review Status</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Need help navigating this collection or locating specific documents? Our archival team can provide specialized assistance and additional context.
          </p>
        </aside>
        
        <Button className="w-full text-xs md:text-sm py-1.5 h-auto mb-4 md:mb-6 shadow-sm">
          <FileDown className="h-4 w-4 mr-1" />
          Download Finding Aid
        </Button>
      </div>
    </div>
  );
};

export default FindingAidSidebar;
