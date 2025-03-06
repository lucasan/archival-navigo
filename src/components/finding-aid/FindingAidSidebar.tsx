
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown, ChevronRight } from 'lucide-react';

interface CollectionHighlight {
  text: string;
}

interface SeriesNavItem {
  title: string;
  id: string;
}

interface FindingAidSidebarProps {
  isVisible: boolean;
  highlights: CollectionHighlight[];
}

// Function to generate series nav items from the highlights
// In a real application, this would come from a proper data source
const generateSeriesNavItems = (highlights: CollectionHighlight[]): SeriesNavItem[] => {
  // This is a simplification - in a real app we'd have real series data with IDs
  return [
    { title: "Series I: Personal Correspondence, 1770-1826", id: "series-1" },
    { title: "Series II: Political Documents, 1780-1817", id: "series-2" },
    { title: "Series III: Financial Records, 1780-1836", id: "series-3" }
  ];
};

const FindingAidSidebar: React.FC<FindingAidSidebarProps> = ({ 
  isVisible,
  highlights
}) => {
  const seriesItems = generateSeriesNavItems(highlights);
  
  const scrollToSeries = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

        <div className="bg-white rounded-lg border shadow-sm p-4 md:p-5">
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Series Navigation</h3>
          <nav className="space-y-2">
            {seriesItems.map((series) => (
              <button
                key={series.id}
                onClick={() => scrollToSeries(series.id)}
                className="w-full text-left flex items-center gap-2 p-2 text-xs md:text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0 text-primary" />
                <span className="line-clamp-2">{series.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FindingAidSidebar;
