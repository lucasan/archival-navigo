
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown, List } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

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
  // Collection links for the table of contents
  const collections = [
    { id: "speechwriting", title: "Records of the White House Office of Speechwriting" },
    { id: "public-liaison", title: "Records of the White House Office of Public Liaison" },
    { id: "science-technology", title: "Records of the White House Office of Science and Technology" }
  ];

  // Scroll smoothly to the selected section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${isVisible ? 'block' : 'hidden lg:block'} w-full lg:w-1/4 flex-shrink-0 animate-fade-in order-last`}>
      <div className="sticky top-4 space-y-4 md:space-y-6">
        <aside className="bg-white rounded-lg border shadow-sm p-4 md:p-5 mb-4 md:mb-6 transition-all hover:shadow-md">
          <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Review Status</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Need help navigating this collection or locating specific documents? Our archival team can provide specialized assistance and additional context.
          </p>
        </aside>
        
        <Button className="w-full text-xs md:text-sm py-1.5 h-auto mb-4 md:mb-6 shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center">
          <FileDown className="h-4 w-4 mr-1" />
          Download Finding Aid
        </Button>

        <aside className="bg-white rounded-lg border shadow-sm p-4 md:p-5 transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <List className="h-4 w-4 text-primary" />
            <h3 className="text-base md:text-lg font-semibold">Table of Contents</h3>
          </div>
          <ScrollArea className="h-[200px] pr-2">
            <nav className="text-xs md:text-sm">
              <ul className="space-y-2">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <a 
                      href={`#${collection.id}`}
                      onClick={(e) => scrollToSection(e, collection.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline block py-1.5 px-2 rounded-md transition-colors hover:bg-blue-50 flex items-start"
                    >
                      <span className="inline-block w-[90%]">{collection.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
};

export default FindingAidSidebar;
