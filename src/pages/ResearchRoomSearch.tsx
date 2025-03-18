import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationHeader from '@/components/finding-aid/NavigationHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Search, Archive, Layers, File, FileText, ExternalLink, FileVideo, FileImage, Calendar, Album, Newspaper } from 'lucide-react';
import { StatusIcon } from '@/components/finding-aid/StatusIcon';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 10;

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
  },
  {
    id: 6,
    title: "Moon Landing Footage",
    type: "page-media",
    fileType: "video",
    date: "1969",
    digitized: "Digitized",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=Moon+Landing",
    excerpt: "Original footage of the Apollo 11 moon landing, including Neil Armstrong's first steps on the lunar surface.",
    duration: "2:56:15"
  },
  {
    id: 7,
    title: "President's Daily Diary: January 20, 1961",
    type: "page-daily-diary",
    date: "1961-01-20",
    digitized: "Digitized",
    naid: "67890123",
    excerpt: "Daily diary documenting President Kennedy's first day in office, including inauguration events and meetings with staff."
  },
  {
    id: 8,
    title: "Vietnam War Contact Sheets",
    type: "page-photo-contact-sheet",
    date: "1968-1969",
    digitized: "Digitized",
    naid: "78901234",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=Contact+Sheet",
    excerpt: "Contact sheets featuring photographs taken by military photographers during the Vietnam War.",
    photoCount: "120 frames"
  },
  {
    id: 10,
    title: "Presidential Signatures Gallery",
    type: "page-gallery",
    date: "1789-2023",
    digitized: "Digitized",
    naid: "90123456",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=Signatures",
    excerpt: "Gallery of signatures from all U.S. Presidents, from George Washington to Joe Biden.",
    itemCount: "46 items"
  },
  {
    id: 11,
    title: "World War II Home Front",
    type: "page-exhibit",
    date: "1941-1945",
    digitized: "Digitized",
    naid: "01234567",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=WW2+Exhibit",
    excerpt: "Online exhibit showcasing how Americans at home supported the war effort through rationing, victory gardens, and factory work.",
    sectionCount: "5 sections"
  },
  {
    id: 12,
    title: "Roosevelt New Deal Programs",
    type: "finding-aid",
    date: "1933-1945",
    digitized: "Digitized",
    naid: "12345987",
    excerpt: "Records related to various New Deal programs implemented during the Roosevelt administration to combat the Great Depression."
  },
  {
    id: 13,
    title: "Series II: Manhattan Project Documents",
    type: "series",
    date: "1942-1946",
    digitized: "Non Digitized", 
    naid: "87654321",
    excerpt: "Classified documents related to the development of the atomic bomb during World War II.",
    seriesExtent: "126 files",
    parentCollection: {
      title: "Atomic Energy Commission Records",
      id: 14
    }
  },
  {
    id: 14,
    title: "Declaration of Independence",
    type: "item",
    date: "1776",
    digitized: "Digitized",
    naid: "23456123",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=Declaration",
    excerpt: "Original manuscript of the Declaration of Independence, signed by the Continental Congress on July 4, 1776.",
    externalUrl: "https://catalog.archives.gov/",
    parentCollection: {
      title: "Founding Documents",
      id: 15
    }
  },
  {
    id: 15,
    title: "Apollo 13 Mission Audio",
    type: "page-media",
    fileType: "audio",
    date: "1970",
    digitized: "Digitized",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=Apollo+13",
    excerpt: "Audio recordings from the Apollo 13 mission, including the famous 'Houston, we've had a problem' transmission.",
    duration: "1:32:45"
  },
  {
    id: 16,
    title: "NASA Photograph Collection",
    type: "page-gallery",
    date: "1958-2023",
    digitized: "Digitized",
    naid: "34565432",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=NASA+Photos",
    excerpt: "Collection of photographs from NASA missions, including space shuttle launches, lunar landings, and planetary exploration.",
    itemCount: "350 items"
  },
  {
    id: 17,
    title: "Cold War Diplomatic Cables",
    type: "file-unit",
    date: "1947-1991",
    digitized: "Digitized",
    naid: "45678123",
    containerId: "D-291-07",
    excerpt: "Diplomatic communications between the U.S. State Department and various embassies during the Cold War period.",
    parentCollection: {
      title: "Department of State Records",
      id: 18
    }
  },
  {
    id: 18,
    title: "JFK Assassination Records",
    type: "finding-aid",
    date: "1963-1979",
    digitized: "Digitized",
    naid: "98765432",
    excerpt: "Collection of materials related to the assassination of President John F. Kennedy and subsequent investigations."
  },
  {
    id: 19,
    title: "Women's Suffrage Movement",
    type: "page-exhibit",
    date: "1848-1920",
    digitized: "Digitized",
    naid: "87654987",
    thumbnailUrl: "https://placehold.co/400x300/e4e4e7/71717a?text=Suffrage",
    excerpt: "Online exhibit documenting the women's suffrage movement in the United States, culminating in the 19th Amendment.",
    sectionCount: "7 sections"
  },
  {
    id: 20,
    title: "Vietnam War Peace Negotiations",
    type: "file-unit",
    date: "1968-1973",
    digitized: "Non Digitized",
    status: "open",
    naid: "12398765",
    containerId: "F-587-03",
    excerpt: "Records of peace negotiations between the United States and North Vietnam, including the Paris Peace Accords.",
    parentCollection: {
      title: "Vietnam War Collection",
      id: 21
    }
  },
  {
    id: 21,
    title: "President Nixon's Daily Diary: August 8, 1974",
    type: "page-daily-diary",
    date: "1974-08-08",
    digitized: "Digitized",
    naid: "65432198",
    excerpt: "Daily diary documenting President Nixon's final day in office, including his resignation announcement and departure from the White House."
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
    case 'page-media':
      return <FileVideo size={18} className="text-red-600" />;
    case 'page-daily-diary':
      return <Calendar size={18} className="text-indigo-600" />;
    case 'page-photo-contact-sheet':
      return <FileImage size={18} className="text-pink-600" />;
    case 'page-finding-aid':
      return <Archive size={18} className="text-sky-600" />;
    case 'page-gallery':
      return <Album size={18} className="text-teal-600" />;
    case 'page-exhibit':
      return <Newspaper size={18} className="text-violet-600" />;
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
    case 'page-media':
      label = 'Media';
      className += ' bg-red-100 text-red-800';
      break;
    case 'page-daily-diary':
      label = 'Daily Diary';
      className += ' bg-indigo-100 text-indigo-800';
      break;
    case 'page-photo-contact-sheet':
      label = 'Photo Contact Sheet';
      className += ' bg-pink-100 text-pink-800';
      break;
    case 'page-finding-aid':
      label = 'Finding Aid Page';
      className += ' bg-sky-100 text-sky-800';
      break;
    case 'page-gallery':
      label = 'Gallery';
      className += ' bg-teal-100 text-teal-800';
      break;
    case 'page-exhibit':
      label = 'Exhibit';
      className += ' bg-violet-100 text-violet-800';
      break;
    default:
      label = type;
      className += ' bg-gray-100 text-gray-800';
  }
  
  return <span className={className}>{label}</span>;
};

const SearchResultCard = ({ result }) => {
  const { title, type, date, digitized, naid, containerId, thumbnailUrl, externalUrl, status, seriesExtent, fileType, duration, photoCount, itemCount, sectionCount, parentCollection, excerpt } = result;
  
  const getLinkDestination = () => {
    switch (type) {
      case 'finding-aid':
        return '/finding-aid';
      case 'series':
      case 'file-unit':
      case 'item':
        return naid ? `https://catalog.archives.gov/id/${naid}` : '#';
      case 'page-media':
      case 'page-daily-diary':
      case 'page-photo-contact-sheet':
      case 'page-gallery':
      case 'page-exhibit':
        return '#';
      default:
        return '#';
    }
  };
  
  const isExternalLink = type !== 'finding-aid';
  
  const isFindingAidRelated = ['finding-aid', 'series', 'file-unit', 'item'].includes(type);
  
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <ResourceTypeIcon type={type} />
            <ResourceTypeLabel type={type} />
            {fileType && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {fileType}
              </span>
            )}
          </div>
          
          <div className="mb-1">
            {isExternalLink ? (
              <a 
                href={getLinkDestination()}
                className="text-xl font-semibold text-primary hover:underline block"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {title}
                <ExternalLink size={14} className="inline-flex ml-1 opacity-70" />
              </a>
            ) : (
              <Link 
                to={getLinkDestination()}
                className="text-xl font-semibold text-primary hover:underline block"
              >
                {title}
              </Link>
            )}
          </div>
          
          {excerpt && (
            <p className="text-sm text-muted-foreground mb-3">{excerpt}</p>
          )}
          
          {isFindingAidRelated && (
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
              {date && <span>{date}</span>}
              {digitized && <span>{digitized}</span>}
              {seriesExtent && <span>Extent: {seriesExtent}</span>}
              {duration && <span>Duration: {duration}</span>}
              {photoCount && <span>{photoCount}</span>}
              {itemCount && <span>{itemCount}</span>}
              {sectionCount && <span>{sectionCount}</span>}
              {type === 'file-unit' && status && (
                <div className="flex items-center gap-1">
                  <StatusIcon status={status} showLabel={true} />
                </div>
              )}
            </div>
          )}
          
          {['series', 'file-unit', 'item'].includes(type) && parentCollection && (
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">
                From collection: <Link to="/finding-aid" className="text-primary hover:underline">{parentCollection.title}</Link>
              </span>
            </div>
          )}
          
          {isFindingAidRelated && (naid || containerId) && (
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
  const [filteredResults, setFilteredResults] = useState([...mockSearchResults]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    // Record Type filters
    architecturalAndEngineering: false,
    artifacts: false,
    dataFiles: false,
    mapsAndCharts: false,
    movingImages: false,
    photographs: false,
    soundRecordings: false,
    textualRecords: false,
    webPages: false,
    
    // Level of Description filters
    levelSeries: false,
    levelFindingAid: false,
    levelFileUnit: false,
    levelItem: false,
    
    // Digitized Status filters
    digitized: false,
    nonDigitized: false,
    
    // Page Type filters
    pageTypeMedia: false,
    pageTypeDailyDiary: false,
    pageTypePhotoContactSheet: false,
    pageTypeFindingAid: false,
    pageTypeGallery: false,
    pageTypeExhibits: false,
  });

  useEffect(() => {
    let results = [...mockSearchResults];
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(result => 
        result.title.toLowerCase().includes(term) || 
        (result.excerpt && result.excerpt.toLowerCase().includes(term))
      );
    }
    
    const levelFilters = {
      'finding-aid': filters.levelFindingAid,
      'series': filters.levelSeries,
      'file-unit': filters.levelFileUnit,
      'item': filters.levelItem
    };
    
    const hasLevelFilter = Object.values(levelFilters).some(value => value);
    if (hasLevelFilter) {
      results = results.filter(result => {
        return levelFilters[result.type] || false;
      });
    }
    
    const hasDigitizedFilter = filters.digitized || filters.nonDigitized;
    if (hasDigitizedFilter) {
      results = results.filter(result => {
        if (filters.digitized && result.digitized === "Digitized") return true;
        if (filters.nonDigitized && result.digitized === "Non Digitized") return true;
        return false;
      });
    }
    
    const pageTypeFilters = {
      'page-media': filters.pageTypeMedia,
      'page-daily-diary': filters.pageTypeDailyDiary,
      'page-photo-contact-sheet': filters.pageTypePhotoContactSheet,
      'page-finding-aid': filters.pageTypeFindingAid,
      'page-gallery': filters.pageTypeGallery,
      'page-exhibit': filters.pageTypeExhibits
    };
    
    const hasPageTypeFilter = Object.values(pageTypeFilters).some(value => value);
    if (hasPageTypeFilter) {
      results = results.filter(result => {
        if (filters.pageTypeFindingAid && 
           ['finding-aid', 'series', 'file-unit', 'item'].includes(result.type)) {
          return true;
        }
        
        return pageTypeFilters[result.type] || false;
      });
    }
    
    const hasRecordTypeFilter = filters.architecturalAndEngineering || 
                              filters.artifacts || 
                              filters.dataFiles || 
                              filters.mapsAndCharts || 
                              filters.movingImages || 
                              filters.photographs || 
                              filters.soundRecordings || 
                              filters.textualRecords || 
                              filters.webPages;
    
    if (hasRecordTypeFilter) {
      results = results.filter(result => {
        if (filters.movingImages && (result.type === 'page-media' && result.fileType === 'video')) return true;
        if (filters.photographs && (result.type === 'page-photo-contact-sheet' || result.type === 'page-gallery')) return true;
        if (filters.soundRecordings && (result.type === 'page-media' && result.fileType === 'audio')) return true;
        if (filters.textualRecords && (['finding-aid', 'series', 'file-unit'].includes(result.type))) return true;
        
        return false;
      });
    }
    
    setFilteredResults(results);
    setCurrentPage(1);
  }, [searchTerm, filters]);

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
      
      pageTypeMedia: false,
      pageTypeDailyDiary: false,
      pageTypePhotoContactSheet: false,
      pageTypeFindingAid: false,
      pageTypeGallery: false,
      pageTypeExhibits: false,
    });
  };

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(null);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(null);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(totalPages);
      }
    }
    
    return pages;
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
                  <h3 className="font-medium mb-3">Page Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pageTypeMedia" 
                        checked={filters.pageTypeMedia} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('pageTypeMedia', checked === true)
                        }
                      />
                      <Label htmlFor="pageTypeMedia">Media</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pageTypeDailyDiary" 
                        checked={filters.pageTypeDailyDiary} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('pageTypeDailyDiary', checked === true)
                        }
                      />
                      <Label htmlFor="pageTypeDailyDiary">Daily Diary</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pageTypePhotoContactSheet" 
                        checked={filters.pageTypePhotoContactSheet} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('pageTypePhotoContactSheet', checked === true)
                        }
                      />
                      <Label htmlFor="pageTypePhotoContactSheet">Photo Contact Sheet</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pageTypeFindingAid" 
                        checked={filters.pageTypeFindingAid} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('pageTypeFindingAid', checked === true)
                        }
                      />
                      <Label htmlFor="pageTypeFindingAid">Finding Aid</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pageTypeGallery" 
                        checked={filters.pageTypeGallery} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('pageTypeGallery', checked === true)
                        }
                      />
                      <Label htmlFor="pageTypeGallery">Gallery</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pageTypeExhibits" 
                        checked={filters.pageTypeExhibits} 
                        onCheckedChange={(checked) => 
                          handleFilterChange('pageTypeExhibits', checked === true)
                        }
                      />
                      <Label htmlFor="pageTypeExhibits">Exhibits</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
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
                
                {/* Apply filters button removed as filtering is automatic */}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-3/4">
            <div className="mb-4">
              <p className="text-muted-foreground">
                Showing {paginatedResults.length} of {filteredResults.length} results for{" "}
                <span className="font-medium text-foreground">
                  {searchTerm || "all finding aids"}
                </span>
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {paginatedResults.length > 0 ? (
                paginatedResults.map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))
              ) : (
                <div className="bg-white rounded-lg border shadow p-8 text-center">
                  <p className="text-lg text-muted-foreground">No results match your search criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
            
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => {
                        e.preventDefault();
                        goToPage(currentPage - 1);
                      }} />
                    </PaginationItem>
                  )}
                  
                  {getPageNumbers().map((page, index) => (
                    page === null ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink 
                          href="#" 
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(page as number);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => {
                        e.preventDefault();
                        goToPage(currentPage + 1);
                      }} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchRoomSearch;
