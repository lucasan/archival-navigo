
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from 'lucide-react';

interface CollectionHighlight {
  text: string;
}

interface FindingAidSidebarProps {
  isVisible: boolean;
  highlights: CollectionHighlight[];
}

const FindingAidSidebar: React.FC<FindingAidSidebarProps> = ({ 
  isVisible,
  highlights
}) => {
  return (
    <div className={`${isVisible ? 'block' : 'hidden lg:block'} w-full lg:w-1/4 flex-shrink-0 animate-fade-in order-last`}>
      <aside className="bg-white rounded-lg border shadow-sm p-4 md:p-5">
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Review Status</h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
          Need help navigating this collection or locating specific documents? Our archival team can provide specialized assistance and additional context.
        </p>
        <Button className="w-full text-xs md:text-sm py-1.5 h-auto">
          <FileDown className="h-4 w-4 mr-1" />
          Download Finding Aid
        </Button>
      </aside>

      <div className="mt-4 md:mt-6 bg-white rounded-lg border shadow-sm p-4 md:p-5">
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Collection Highlights</h3>
        <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
              <span className="text-muted-foreground">{highlight.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FindingAidSidebar;
