
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

// Mock data for the Finding Aids with more examples for "A"
const mockFindingAids = [
  { 
    id: 1, 
    title: "Adams Family Papers", 
    type: "Textual", 
    excerpt: "Collection of correspondence, diaries, and other papers of the Adams family of Massachusetts, including John Adams and John Quincy Adams. The collection spans multiple generations and provides insight into American politics, diplomacy, and social life from the late 18th century through the early 20th century. Includes original manuscripts, letterbooks, diaries, and personal correspondence between family members. The papers document John Adams's role in the American Revolution, his presidency, and John Quincy Adams's diplomatic career and presidency, as well as the activities of other family members." 
  },
  { 
    id: 2, 
    title: "Architectural Drawings of Federal Buildings", 
    type: "Textual", 
    excerpt: "Collection of architectural drawings, blueprints, and plans for federal buildings constructed throughout the United States from the 1850s through the 1950s. Includes designs for courthouses, post offices, custom houses, and other government facilities. The collection documents the evolution of federal architecture and the expansion of government services across the country." 
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
  },
  // Additional 'A' items for pagination demonstration
  { 
    id: 27, 
    title: "American Revolution Military Correspondence", 
    type: "Textual", 
    excerpt: "Collection of military correspondence from the American Revolutionary War, including letters between officers, battle reports, and strategic planning documents. The collection provides insights into military tactics, logistics, and the challenges faced by the Continental Army during the fight for independence." 
  },
  { 
    id: 28, 
    title: "Armstrong Space Program Records", 
    type: "FOIA", 
    excerpt: "Documents related to Neil Armstrong and the Apollo space program, including mission planning, training materials, and post-mission reports. The collection covers the development of the lunar landing missions and includes transcripts of communications between astronauts and mission control." 
  },
  { 
    id: 29, 
    title: "Appalachian Cultural Heritage Collection", 
    type: "Textual", 
    excerpt: "Documentation of Appalachian cultural traditions, music, crafts, and daily life from the 19th and 20th centuries. Includes oral histories, photographs, and recordings that capture the unique cultural heritage of the Appalachian region and its communities." 
  },
  { 
    id: 30, 
    title: "Agricultural Development Records", 
    type: "Textual", 
    excerpt: "Documentation of agricultural practices, innovations, and policies in the United States from the 1800s to the present. Includes reports on crop development, farming techniques, land use, and the evolution of agricultural technology and science throughout American history." 
  },
  { 
    id: 31, 
    title: "Atomic Energy Commission Records", 
    type: "FOIA", 
    excerpt: "Declassified documents from the Atomic Energy Commission detailing the development of nuclear energy and weapons technologies from the 1940s through the 1970s. Includes research reports, policy documents, and correspondence related to nuclear programs and regulation." 
  },
  { 
    id: 32, 
    title: "Alaska Purchase Documents", 
    type: "Textual", 
    excerpt: "Records related to the purchase of Alaska from Russia in 1867, including diplomatic correspondence, treaty documents, and congressional debates. The collection documents the negotiations led by Secretary of State William Seward and the political reactions to what was then called 'Seward's Folly.'" 
  },
  { 
    id: 33, 
    title: "Aviation Development Archives", 
    type: "FOIA", 
    excerpt: "Documents tracking the development of American aviation from early experiments to modern aerospace technology. Includes technical drawings, test flight records, and material on key innovations and milestones in the history of human flight." 
  },
  { 
    id: 34, 
    title: "Admiralty Court Records", 
    type: "Textual", 
    excerpt: "Collection of legal documents from American admiralty courts from the late 18th century through the 19th century. These records detail maritime disputes, piracy cases, salvage claims, and other legal matters related to shipping and oceanic commerce." 
  },
  { 
    id: 35, 
    title: "Astronaut Personal Records", 
    type: "FOIA", 
    excerpt: "Personal records, diaries, and correspondence of early NASA astronauts, providing insights into their training, missions, and personal reflections on space exploration. The collection includes materials from Mercury, Gemini, and Apollo program participants." 
  },
  { 
    id: 36, 
    title: "Abolition Movement Papers", 
    type: "Textual", 
    excerpt: "Documents from prominent abolitionists and anti-slavery organizations from the late 18th century through the Civil War. Includes correspondence, pamphlets, speeches, and organizational records detailing strategies and activities of the movement to end slavery in the United States." 
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

// Function to truncate text to a specified length
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const FindingAidsListing: React.FC = () => {
  // Set "A" as the default selected letter
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
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
        
        {filteredFindingAids.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No finding aids start with the letter "{selectedLetter}".</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentItems.map(aid => (
              <Card key={aid.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div>
                      <Link 
                        to={aid.type === "Textual" ? "/finding-aid" : aid.type === "FOIA" ? "/finding-aid-no-series" : "/finding-aid-no-containers"} 
                        className="text-xl font-semibold text-primary hover:underline block"
                      >
                        {aid.title}
                      </Link>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {aid.type} Finding Aid
                      </span>
                    </div>
                    <div>
                      <p className="text-muted-foreground mt-2">
                        {truncateText(aid.excerpt, 600)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
