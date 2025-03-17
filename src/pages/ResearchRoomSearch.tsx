
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Search, FileText, Calendar, Filter } from 'lucide-react';

// Mock search results data
const mockSearchResults = [
  {
    id: 1,
    title: "Adams Family Papers",
    type: "Textual",
    date: "1750-1889",
    matches: ["correspondence", "diaries", "politics", "diplomacy"],
    excerpt: "Collection of correspondence, diaries, and other papers of the Adams family of Massachusetts, including John Adams and John Quincy Adams."
  },
  {
    id: 2,
    title: "Civil War Photographs",
    type: "Photographic",
    date: "1861-1865",
    matches: ["battle", "soldiers", "Lincoln", "military"],
    excerpt: "Photographs documenting the Civil War, including images of military personnel, preparations for battle, and battlefield operations."
  },
  {
    id: 3,
    title: "Immigration Records Collection",
    type: "Textual",
    date: "1892-1954",
    matches: ["Ellis Island", "naturalization", "passenger lists"],
    excerpt: "Records documenting immigration to the United States, including passenger lists and naturalization papers."
  },
  {
    id: 4,
    title: "Presidential Executive Orders",
    type: "FOIA",
    date: "1789-2023",
    matches: ["government", "policy", "executive branch"],
    excerpt: "Collection of executive orders issued by presidents of the United States from George Washington to the present day."
  },
  {
    id: 5,
    title: "NASA Space Program Archives",
    type: "Multi-format",
    date: "1958-2022",
    matches: ["Apollo", "space exploration", "astronauts"],
    excerpt: "Documentation of NASA's space programs including mission reports, technical drawings, and correspondence related to various space missions."
  }
];

const ResearchRoomSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    textual: true,
    photographic: true,
    audiovisual: true,
    electronic: true,
    foia: true,
    multiformat: true,
    dateFrom: '',
    dateTo: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key: keyof typeof filters, value: boolean | string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    console.log("Filters:", filters);
    // Would trigger actual search here
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Research Room Search</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex items-center w-full mb-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                type="text"
                placeholder="Search for finding aids, collections, documents..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 py-6 text-lg w-full"
              />
            </div>
            <Button type="submit" className="ml-4">
              Search
            </Button>
          </div>
        </form>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Column (Left) */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                <Button variant="ghost" size="sm" onClick={() => {
                  setFilters({
                    textual: true,
                    photographic: true,
                    audiovisual: true,
                    electronic: true,
                    foia: true,
                    multiformat: true,
                    dateFrom: '',
                    dateTo: '',
                  });
                }}>
                  Reset
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Record Type Filter Section */}
                <div>
                  <h3 className="font-medium mb-3">Record Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="textual" 
                        checked={filters.textual} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('textual', checked === true)
                        }
                      />
                      <Label htmlFor="textual">Textual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="photographic" 
                        checked={filters.photographic} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('photographic', checked === true)
                        }
                      />
                      <Label htmlFor="photographic">Photographic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="audiovisual" 
                        checked={filters.audiovisual} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('audiovisual', checked === true)
                        }
                      />
                      <Label htmlFor="audiovisual">Audiovisual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="electronic" 
                        checked={filters.electronic} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('electronic', checked === true)
                        }
                      />
                      <Label htmlFor="electronic">Electronic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="foia" 
                        checked={filters.foia}
                        onCheckedChange={(checked) => 
                          handleFilterChange('foia', checked === true)
                        }
                      />
                      <Label htmlFor="foia">FOIA</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="multiformat" 
                        checked={filters.multiformat} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('multiformat', checked === true)
                        }
                      />
                      <Label htmlFor="multiformat">Multi-format</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Date Range Filter Section */}
                <div>
                  <h3 className="font-medium mb-3">Date Range</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="date-from">From</Label>
                      <Input 
                        id="date-from" 
                        type="text" 
                        placeholder="Year (e.g., 1950)" 
                        value={filters.dateFrom}
                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="date-to">To</Label>
                      <Input 
                        id="date-to" 
                        type="text" 
                        placeholder="Year (e.g., 2000)" 
                        value={filters.dateTo}
                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Apply Filters Button */}
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </div>
          
          {/* Results Column (Right) */}
          <div className="w-full lg:w-3/4">
            <div className="mb-4">
              <p className="text-muted-foreground">
                Showing {mockSearchResults.length} results for{" "}
                <span className="font-medium text-foreground">
                  {searchTerm || "all finding aids"}
                </span>
              </p>
            </div>
            
            <div className="space-y-4">
              {mockSearchResults.map((result) => (
                <Card key={result.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <div className="mb-1">
                        <Link 
                          to={result.type === "Textual" ? "/finding-aid" : 
                               result.type === "FOIA" ? "/finding-aid-no-series" : 
                               "/finding-aid-no-containers"} 
                          className="text-xl font-semibold text-primary hover:underline block"
                        >
                          {result.title}
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{result.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{result.date}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">
                        {result.excerpt}
                      </p>
                      
                      {result.matches.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            Matched terms: {result.matches.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchRoomSearch;
