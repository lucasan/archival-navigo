
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

// Mock search results data
const mockSearchResults = [
  {
    id: 1,
    title: "Adams Family Papers",
    type: "Textual Records",
    date: "1750-1889",
    digitized: "Partially Digitized",
    excerpt: "Collection of correspondence, diaries, and other papers of the Adams family of Massachusetts, including John Adams and John Quincy Adams."
  },
  {
    id: 2,
    title: "Civil War Photographs",
    type: "Photographs and other Graphic Materials",
    date: "1861-1865",
    digitized: "Digitized",
    excerpt: "Photographs documenting the Civil War, including images of military personnel, preparations for battle, and battlefield operations."
  },
  {
    id: 3,
    title: "Immigration Records Collection",
    type: "Textual Records",
    date: "1892-1954",
    digitized: "Non Digitized",
    excerpt: "Records documenting immigration to the United States, including passenger lists and naturalization papers."
  },
  {
    id: 4,
    title: "Presidential Executive Orders",
    type: "Textual Records",
    date: "1789-2023",
    digitized: "Digitized",
    excerpt: "Collection of executive orders issued by presidents of the United States from George Washington to the present day."
  },
  {
    id: 5,
    title: "NASA Space Program Archives",
    type: "Data Files",
    date: "1958-2022",
    digitized: "Partially Digitized",
    excerpt: "Documentation of NASA's space programs including mission reports, technical drawings, and correspondence related to various space missions."
  }
];

const ResearchRoomSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    // Record Types
    architecturalAndEngineering: false,
    artifacts: false,
    dataFiles: false,
    mapsAndCharts: false,
    movingImages: false,
    photographs: false,
    soundRecordings: false,
    textualRecords: true,
    webPages: false,
    
    // Level of Description
    levelFindingAid: true,
    levelFileUnit: true,
    levelItem: true,
    
    // Digitized Status
    digitized: true,
    nonDigitized: true,
    partiallyDigitized: true,
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

  const resetFilters = () => {
    setFilters({
      architecturalAndEngineering: false,
      artifacts: false,
      dataFiles: false,
      mapsAndCharts: false,
      movingImages: false,
      photographs: false,
      soundRecordings: false,
      textualRecords: true,
      webPages: false,
      
      levelFindingAid: true,
      levelFileUnit: true,
      levelItem: true,
      
      digitized: true,
      nonDigitized: true,
      partiallyDigitized: true,
    });
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
                <h2 className="text-xl font-semibold">
                  Filters
                </h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
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
                        id="architecturalAndEngineering" 
                        checked={filters.architecturalAndEngineering} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('architecturalAndEngineering', checked === true)
                        }
                      />
                      <Label htmlFor="architecturalAndEngineering">
                        Architectural and Engineering Drawings
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="artifacts" 
                        checked={filters.artifacts} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('artifacts', checked === true)
                        }
                      />
                      <Label htmlFor="artifacts">
                        Artifacts
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="dataFiles" 
                        checked={filters.dataFiles} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('dataFiles', checked === true)
                        }
                      />
                      <Label htmlFor="dataFiles">
                        Data Files
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mapsAndCharts" 
                        checked={filters.mapsAndCharts} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('mapsAndCharts', checked === true)
                        }
                      />
                      <Label htmlFor="mapsAndCharts">
                        Maps and Charts
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="movingImages" 
                        checked={filters.movingImages} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('movingImages', checked === true)
                        }
                      />
                      <Label htmlFor="movingImages">
                        Moving Images
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="photographs" 
                        checked={filters.photographs} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('photographs', checked === true)
                        }
                      />
                      <Label htmlFor="photographs">
                        Photographs and other Graphic Materials
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="soundRecordings" 
                        checked={filters.soundRecordings} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('soundRecordings', checked === true)
                        }
                      />
                      <Label htmlFor="soundRecordings">
                        Sound Recordings
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="textualRecords" 
                        checked={filters.textualRecords} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('textualRecords', checked === true)
                        }
                      />
                      <Label htmlFor="textualRecords">
                        Textual Records
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="webPages" 
                        checked={filters.webPages} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('webPages', checked === true)
                        }
                      />
                      <Label htmlFor="webPages">
                        Web Pages
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Separator />

                {/* Level of Description Filter Section */}
                <div>
                  <h3 className="font-medium mb-3">Level of Description</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="levelFindingAid" 
                        checked={filters.levelFindingAid} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('levelFindingAid', checked === true)
                        }
                      />
                      <Label htmlFor="levelFindingAid">Finding Aid</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="levelFileUnit" 
                        checked={filters.levelFileUnit} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('levelFileUnit', checked === true)
                        }
                      />
                      <Label htmlFor="levelFileUnit">File Unit</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="levelItem" 
                        checked={filters.levelItem} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('levelItem', checked === true)
                        }
                      />
                      <Label htmlFor="levelItem">Item</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Digitized Status Filter Section */}
                <div>
                  <h3 className="font-medium mb-3">Digitized Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="digitized" 
                        checked={filters.digitized} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('digitized', checked === true)
                        }
                      />
                      <Label htmlFor="digitized">
                        Digitized
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="nonDigitized" 
                        checked={filters.nonDigitized} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('nonDigitized', checked === true)
                        }
                      />
                      <Label htmlFor="nonDigitized">Non Digitized</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="partiallyDigitized" 
                        checked={filters.partiallyDigitized} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('partiallyDigitized', checked === true)
                        }
                      />
                      <Label htmlFor="partiallyDigitized">Partially Digitized</Label>
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
                          to={result.type === "Textual Records" ? "/finding-aid" : 
                               result.type === "Textual" ? "/finding-aid-no-series" : 
                               "/finding-aid-no-containers"} 
                          className="text-xl font-semibold text-primary hover:underline block"
                        >
                          {result.title}
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-muted-foreground">{result.type}</span>
                        <span className="text-sm text-muted-foreground">{result.date}</span>
                        <span className="text-sm text-muted-foreground">{result.digitized}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">
                        {result.excerpt}
                      </p>
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
