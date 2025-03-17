import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

// Mock data for the Finding Aids
const mockFindingAids = [
  { 
    id: 1, 
    title: "Adams Family Papers", 
    type: "Textual", 
    excerpt: "Collection of correspondence, diaries, and other papers of the Adams family of Massachusetts, including John Adams and John Quincy Adams." 
  },
  { 
    id: 2, 
    title: "Bancroft Collection", 
    type: "Textual", 
    excerpt: "Papers of historian George Bancroft, including his research materials for writing the history of the United States." 
  },
  { 
    id: 3, 
    title: "Civil War Photographs", 
    type: "FOIA", 
    excerpt: "Photographs documenting the Civil War, including images of military personnel, preparations for battle, and battlefield operations." 
  },
  { 
    id: 4, 
    title: "Declaration of Independence", 
    type: "FOIA", 
    excerpt: "Documents related to the creation and signing of the Declaration of Independence, including drafts and correspondence." 
  },
  { 
    id: 5, 
    title: "Edison Papers", 
    type: "Textual", 
    excerpt: "Collection of Thomas Edison's papers, including laboratory notebooks, correspondence, and patent applications." 
  },
  { 
    id: 6, 
    title: "Franklin D. Roosevelt Papers", 
    type: "FOIA", 
    excerpt: "Official and personal papers of President Franklin D. Roosevelt, documenting his presidency and personal life." 
  },
  { 
    id: 7, 
    title: "Grant Administration Records", 
    type: "Textual", 
    excerpt: "Records from Ulysses S. Grant's presidency, including official correspondence and cabinet papers." 
  },
  { 
    id: 8, 
    title: "Hamilton-Burr Duel Documents", 
    type: "FOIA", 
    excerpt: "Collection of documents related to the 1804 duel between Alexander Hamilton and Aaron Burr." 
  },
  { 
    id: 9, 
    title: "Immigration Records Collection", 
    type: "Textual", 
    excerpt: "Records documenting immigration to the United States, including passenger lists and naturalization papers." 
  },
  { 
    id: 10, 
    title: "Jefferson Papers", 
    type: "FOIA", 
    excerpt: "Collection of Thomas Jefferson's correspondence, memoranda, and other papers from his time as president and beyond." 
  },
  { 
    id: 11, 
    title: "Kennedy Administration Records", 
    type: "Textual", 
    excerpt: "Official records and papers from John F. Kennedy's presidency, including cabinet meetings and policy documents." 
  },
  { 
    id: 12, 
    title: "Lincoln Assassination Records", 
    type: "FOIA", 
    excerpt: "Documents related to the assassination of President Abraham Lincoln, including investigation records and witness testimonies." 
  },
  { 
    id: 13, 
    title: "Manhattan Project Files", 
    type: "FOIA", 
    excerpt: "Declassified documents related to the Manhattan Project and the development of the atomic bomb during World War II." 
  },
  { 
    id: 14, 
    title: "Native American Treaties", 
    type: "Textual", 
    excerpt: "Collection of treaties between the United States government and Native American tribes from the 18th to the 20th century." 
  },
  { 
    id: 15, 
    title: "Oregon Trail Diaries", 
    type: "Textual", 
    excerpt: "Personal diaries and accounts of settlers who traveled the Oregon Trail during the western expansion of the United States." 
  },
  { 
    id: 16, 
    title: "Panama Canal Construction Records", 
    type: "FOIA", 
    excerpt: "Documents related to the planning, construction, and operation of the Panama Canal." 
  },
  { 
    id: 17, 
    title: "Quaker Meeting Minutes", 
    type: "Textual", 
    excerpt: "Records of various Quaker meetings throughout the United States, documenting religious practices and community activities." 
  },
  { 
    id: 18, 
    title: "Revolutionary War Pension Applications", 
    type: "FOIA", 
    excerpt: "Applications for pensions by Revolutionary War veterans, including personal statements about their service." 
  },
  { 
    id: 19, 
    title: "Slavery and Abolition Documents", 
    type: "Textual", 
    excerpt: "Collection of documents related to slavery in the United States and the abolition movement, including personal accounts and legal documents." 
  },
  { 
    id: 20, 
    title: "Transcontinental Railroad Records", 
    type: "FOIA", 
    excerpt: "Documents concerning the planning, construction, and operation of the first transcontinental railroad in the United States." 
  },
  { 
    id: 21, 
    title: "Underground Railroad Records", 
    type: "Textual", 
    excerpt: "Documents related to the Underground Railroad, including correspondence between abolitionists and accounts of escaped enslaved people." 
  },
  { 
    id: 22, 
    title: "Vietnam War Declassified Documents", 
    type: "FOIA", 
    excerpt: "Declassified government documents related to U.S. involvement in the Vietnam War, including military operations and diplomatic efforts." 
  },
  { 
    id: 23, 
    title: "Washington Papers", 
    type: "Textual", 
    excerpt: "Collection of George Washington's papers, including correspondence, diaries, and military records." 
  },
  { 
    id: 24, 
    title: "X-15 Experimental Aircraft Project", 
    type: "FOIA", 
    excerpt: "Records documenting the X-15 hypersonic research program, including test flight data and technical specifications." 
  },
  { 
    id: 25, 
    title: "Yellowstone National Park Establishment Records", 
    type: "Textual", 
    excerpt: "Documents related to the establishment and early administration of Yellowstone National Park, the first national park in the United States." 
  },
  { 
    id: 26, 
    title: "Zenger Trial Documents", 
    type: "FOIA", 
    excerpt: "Records from the 1735 trial of John Peter Zenger, a landmark case for freedom of the press in colonial America." 
  }
];

// Group finding aids by first letter
const groupByFirstLetter = (findingAids: typeof mockFindingAids) => {
  const grouped: Record<string, typeof mockFindingAids> = {};
  
  findingAids.forEach(aid => {
    const firstLetter = aid.title.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(aid);
  });
  
  return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
};

// Get all unique first letters from finding aids and count items per letter
const getAlphabeticalCounts = (findingAids: typeof mockFindingAids) => {
  const letterCounts: Record<string, number> = {};
  
  findingAids.forEach(aid => {
    const firstLetter = aid.title.charAt(0).toUpperCase();
    if (!letterCounts[firstLetter]) {
      letterCounts[firstLetter] = 0;
    }
    letterCounts[firstLetter]++;
  });
  
  // Create an array of all letters A-Z with counts (0 if no items)
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const result = alphabet.map(letter => ({
    letter,
    count: letterCounts[letter] || 0
  }));
  
  return result;
};

const FindingAidsListing: React.FC = () => {
  // Set "A" as the default selected letter
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const alphabeticalCounts = getAlphabeticalCounts(mockFindingAids);
  
  // Filter finding aids by selected letter
  const filteredFindingAids = mockFindingAids.filter(
    aid => aid.title.charAt(0).toUpperCase() === selectedLetter
  );
  
  // Calculate pagination
  const totalItems = filteredFindingAids.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFindingAids.slice(indexOfFirstItem, indexOfLastItem);
  
  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLetter]);
  
  // Group the current items
  const groupedItems = groupByFirstLetter(currentItems);
  
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Finding Aids Directory</h1>
        
        {/* Alphabetical Glossary Menu */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-wrap gap-2 py-2">
            {alphabeticalCounts.map(({ letter, count }) => (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "default" : "outline"}
                size="sm"
                disabled={count === 0}
                onClick={() => setSelectedLetter(letter)}
                className={`min-w-[4rem] ${count === 0 ? 'opacity-50' : ''}`}
              >
                {letter} ({count})
              </Button>
            ))}
          </div>
          <Separator className="mt-2 mb-6" />
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium">
            Showing finding aids starting with "{selectedLetter}"
          </h2>
        </div>
        
        {filteredFindingAids.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No finding aids start with the letter "{selectedLetter}".</p>
          </div>
        ) : (
          groupedItems.map(([letter, aids]) => (
            <div key={letter} className="mb-8">
              <div className="sticky top-0 bg-background z-10 py-2">
                <h2 className="text-2xl font-bold text-primary mb-2">{letter}</h2>
                <Separator className="mb-4" />
              </div>
              
              <div className="space-y-4">
                {aids.map(aid => (
                  <Card key={aid.id} className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                        <div className="md:w-1/5">
                          <Link 
                            to={aid.type === "Textual" ? "/finding-aid" : aid.type === "FOIA" ? "/finding-aid-no-series" : "/finding-aid-no-containers"} 
                            className="text-lg font-semibold text-primary hover:underline"
                          >
                            {aid.title}
                          </Link>
                          <div className="text-sm font-medium text-muted-foreground">
                            {aid.type} Finding Aid
                          </div>
                        </div>
                        <div className="md:w-4/5">
                          <p className="text-muted-foreground">{aid.excerpt}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
        
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                      }} 
                    />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      }} 
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindingAidsListing;
