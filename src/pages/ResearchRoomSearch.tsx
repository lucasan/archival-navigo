import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Search, Archive, Layers, File, FileText, ExternalLink } from 'lucide-react';
import { StatusIcon } from '@/components/finding-aid/StatusIcon';

const mockSearchResults = [
  {
    id: 1,
    title: "Adams Family Papers",
    type: "finding-aid",
    date: "1750-1889",
    digitized: "Digitized",
    naid: "12345678",
    excerpt: "Collection of correspondence, diaries, and other papers of the Adams family of Massachusetts, including John Adams and John Quincy Adams."
  },
  {
    id: 2,
    title: "Series I: Civil War Photographs",
    type: "series",
    date: "1861-1865",
    digitized: "Digitized",
    naid: "23456789",
    excerpt: "Photographs documenting the Civil War, including images of military personnel, preparations for battle, and battlefield operations.",
    seriesExtent: "245 photographs",
    parentCollection: {
      title: "Civil War Records",
      id: 4
    }
  },
  {
    id: 3,
    title: "Immigration Records",
    type: "file-unit",
    date: "1892-1954",
    digitized: "Non Digitized",
    status: "closed",
    naid: "34567890",
    containerId: "B-432-01",
    excerpt: "Records documenting immigration to the United States, including passenger lists and naturalization papers.",
    parentCollection: {
      title: "Bureau of Immigration and Naturalization",
      id: 5
    }
  },
  {
    id: 4,
    title: "Presidential Executive Orders",
    type: "finding-aid",
    date: "1789-2023",
    digitized: "Digitized",
    naid: "45678901",
    excerpt: "Collection of executive orders issued by presidents of the United States from George Washington to the present day."
  },
  {
    id: 5,
    title: "Apollo 11 Mission Patch",
    type: "item",
    date: "1969",
    digitized: "Digitized",
    naid: "56789012",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=Apollo+11+Patch",
    excerpt: "Official mission patch worn by astronauts during the Apollo 11 mission, the first lunar landing.",
    externalUrl: "https://catalog.archives.gov/",
    parentCollection: {
      title: "NASA Space Missions Collection",
      id: 6
    }
  }
];

const ResourceTypeIcon = ({ type }) => {
  switch (type) {
    case 'finding-aid':
      return <Archive size={18} className="text-blue-600" />;
    case 'series':
      return <Layers size={18} className="text-purple-600" />;
    case 'file-unit':
      return <File size={18} className="text-amber-600" />;
    case 'item':
      return <FileText size={18} className="text-emerald-600" />;
    default:
      return <FileText size={18} className="text-gray-600" />;
  }
};

const ResourceTypeLabel = ({ type }) => {
  let label = '';
  let className = 'px-2 py-0.5 rounded-full text-xs font-medium';
  
  switch (type) {
    case 'finding-aid':
      label = 'Finding Aid';
      className += ' bg-blue-100 text-blue-800';
      break;
    case 'series':
      label = 'Series';
      className += ' bg-purple-100 text-purple-800';
      break;
    case 'file-unit':
      label = 'File Unit';
      className += ' bg-amber-100 text-amber-800';
      break;
    case 'item':
      label = 'Item';
      className += ' bg-emerald-100 text-emerald-800';
      break;
    default:
      label = type;
      className += ' bg-gray-100 text-gray-800';
  }
  
  return <span className={className}>{label}</span>;
};

const SearchResultCard = ({ result }) => {
  const { title, type, date, digitized, naid, containerId, thumbnailUrl, externalUrl, status, seriesExtent, parentCollection, excerpt } = result;
  
  const getLinkDestination = () => {
    switch (type) {
      case 'finding-aid':
        return '/finding-aid';
      case 'series':
        return '/finding-aid#' + title.toLowerCase().replace(/\s+/g, '-');
      case 'file-unit':
        return '/finding-aid-no-containers';
      case 'item':
        return externalUrl || '#';
      default:
        return '#';
    }
  };
  
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <ResourceTypeIcon type={type} />
            <ResourceTypeLabel type={type} />
          </div>
          
          <div className="mb-1">
            <Link 
              to={getLinkDestination()}
              className="text-xl font-semibold text-primary hover:underline block"
              target={type === 'item' && externalUrl ? '_blank' : undefined}
            >
              {title}
              {type === 'item' && externalUrl && 
                <ExternalLink size={14} className="inline-flex ml-1 opacity-70" />
              }
            </Link>
          </div>
          
          {excerpt && (
            <p className="text-muted-foreground mb-3 text-sm">{excerpt}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
            {date && <span>{date}</span>}
            {digitized && <span>{digitized}</span>}
            {seriesExtent && <span>Extent: {seriesExtent}</span>}
            {type === 'file-unit' && status && (
              <div className="flex items-center gap-1">
                <StatusIcon status={status} showLabel={true} />
              </div>
            )}
          </div>
          
          {['series', 'file-unit', 'item'].includes(type) && parentCollection && (
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">
                From collection: <Link to="/finding-aid" className="text-primary hover:underline">{parentCollection.title}</Link>
              </span>
            </div>
          )}
          
          {(naid || containerId) && (
            <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
              {naid && <span>NAID: <span className="font-medium">{naid}</span></span>}
              {containerId && <span>Container: <span className="font-medium">{containerId}</span></span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ResearchRoomSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    architecturalAndEngineering: false,
    artifacts: false,
    dataFiles: false,
    mapsAndCharts: false,
    movingImages: false,
    photographs: false,
    soundRecordings: false,
    textualRecords: false,
    webPages: false,
    
    levelSeries: false,
    levelFindingAid: false,
    levelFileUnit: false,
    levelItem: false,
    
    digitized: false,
    nonDigitized: false,
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
      textualRecords: false,
      webPages: false,
      
      levelSeries: false,
      levelFindingAid: false,
      levelFileUnit: false,
      levelItem: false,
      
      digitized: false,
      nonDigitized: false,
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

                <div>
                  <h3 className="font-medium mb-3">Level of Description</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="levelSeries" 
                        checked={filters.levelSeries} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('levelSeries', checked === true)
                        }
                      />
                      <Label htmlFor="levelSeries">Series</Label>
                    </div>
                    
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
                  </div>
                </div>
                
                <Separator />
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </div>
          
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
                <SearchResultCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchRoomSearch;
