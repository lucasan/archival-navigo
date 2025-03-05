
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, File, Package, Lock, FolderOpen, Scan, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileUnitStatus = 'open' | 'closed' | 'digitized';

type TreeNodeProps = {
  title: string;
  type: 'series' | 'container' | 'file-unit' | 'item';
  isDigitized?: boolean;
  children?: React.ReactNode;
  thumbnailUrl?: string;
  externalUrl?: string;
  level?: number;
  seriesDescription?: string;
  seriesExtent?: string;
  seriesArrangement?: string;
  seriesDate?: string;
  containerNumber?: string;
  containerType?: string;
  fileUnitStatus?: FileUnitStatus;
  searchTerm?: string;
  statusFilter?: FileUnitStatus | 'all';
  isVisible?: boolean;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  title,
  type,
  isDigitized,
  children,
  thumbnailUrl,
  externalUrl,
  level = 0,
  seriesDescription,
  seriesExtent,
  seriesArrangement,
  seriesDate,
  containerNumber,
  containerType,
  fileUnitStatus = 'open',
  searchTerm = '',
  statusFilter = 'all',
  isVisible = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(type === 'series' || type === 'container');
  const hasChildren = Boolean(children);

  // Process children to apply search and filter
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];
  
  // Check if this node matches the search term
  const matchesSearch = searchTerm.trim() === '' || 
    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (seriesDescription && seriesDescription.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Check if this node matches the status filter (only applies to file-units)
  const matchesStatusFilter = statusFilter === 'all' || 
    type !== 'file-unit' || 
    fileUnitStatus === statusFilter;
  
  // A node is visible if it matches both search and filter criteria
  const nodeIsVisible = matchesSearch && matchesStatusFilter;
  
  // Modify children with search and filter props
  const processedChildren = childrenArray.map((child) => {
    // Clone each child with the search term and status filter
    return React.cloneElement(child, {
      searchTerm,
      statusFilter,
    });
  });
  
  // IMPORTANT: All hooks must be at the top level, including useEffect
  useEffect(() => {
    if ((searchTerm && searchTerm.trim() !== '') || statusFilter !== 'all') {
      setIsExpanded(true);
    }
  }, [searchTerm, statusFilter]);
  
  // Recursive function to check if any child or descendant is visible with both search and status filter
  const hasVisibleChildren = () => {
    if (!hasChildren || !children) return false;
    
    // If not searching or filtering, all children are visible
    if (searchTerm.trim() === '' && statusFilter === 'all') {
      return childrenArray.length > 0;
    }
    
    return childrenArray.some(child => {
      const childMatchesFilters = childMatchesSearchAndFilter(child);
      
      // If the child itself matches both filters
      if (childMatchesFilters) {
        return true;
      }
      
      // For containers and series, check their children recursively
      if ((child.props.type === 'container' || child.props.type === 'series') && child.props.children) {
        const childChildren = React.Children.toArray(child.props.children) as React.ReactElement[];
        
        return childChildren.some(grandchild => {
          // Check if grandchild matches search and filter
          if (childMatchesSearchAndFilter(grandchild)) {
            return true;
          }
          
          // If grandchild is a file-unit or container, check its children
          if ((grandchild.props.type === 'file-unit' || grandchild.props.type === 'container') && grandchild.props.children) {
            const greatGrandchildren = React.Children.toArray(grandchild.props.children) as React.ReactElement[];
            return greatGrandchildren.some(ggChild => 
              childMatchesSearchAndFilter(ggChild)
            );
          }
          
          return false;
        });
      }
      
      return false;
    });
  };
  
  // Helper function to check if a child node matches search and filter criteria
  const childMatchesSearchAndFilter = (child: React.ReactElement) => {
    const childMatchesSearch = searchTerm.trim() === '' || 
      child.props.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (child.props.seriesDescription && 
       child.props.seriesDescription.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const childMatchesFilter = statusFilter === 'all' || 
      child.props.type !== 'file-unit' || 
      child.props.fileUnitStatus === statusFilter;
    
    return childMatchesSearch && childMatchesFilter;
  };
  
  // Determine if this node should be displayed based on visibility rules for its type
  const shouldDisplay = isVisible && (
    // If no search/filter is applied, show everything
    (searchTerm.trim() === '' && statusFilter === 'all') ||
    // For items: visible if they match search criteria and their parent file-unit matches filter
    (type === 'item' && matchesSearch) ||
    // For file-units: visible if they match both search and status filter
    (type === 'file-unit' && nodeIsVisible) ||
    // For other types: visible if they match criteria OR have visible children
    ((type === 'series' || type === 'container') && (nodeIsVisible || hasVisibleChildren()))
  );
  
  // Early return AFTER all hooks have been called
  if (!shouldDisplay) {
    return null;
  }

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const renderStatusIcon = (status: FileUnitStatus) => {
    switch (status) {
      case 'open':
        return <FolderOpen size={16} className="text-green-600" />;
      case 'closed':
        return <Lock size={16} className="text-red-600" />;
      case 'digitized':
        return <Scan size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: FileUnitStatus) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
      case 'digitized':
        return 'Digitized';
      default:
        return '';
    }
  };

  return (
    <div className="animate-fade-in">
      <div 
        className={cn(
          'tree-node flex items-center gap-2',
          {
            'tree-node-series': type === 'series',
            'tree-node-container': type === 'container',
            'tree-node-file': type === 'file-unit',
            'tree-node-item': type === 'item',
            'bg-yellow-50': matchesSearch && searchTerm.trim() !== '',
          }
        )}
      >
        {hasChildren ? (
          <button 
            onClick={toggleExpand}
            className="flex-none w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <span className="w-5 h-5 flex-none flex items-center justify-center">
            {type === 'item' && <File size={16} className="text-muted-foreground" />}
            {type === 'container' && <Package size={16} className="text-muted-foreground" />}
          </span>
        )}

        {type === 'item' && thumbnailUrl && (
          <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px] flex-none overflow-hidden rounded-md border mr-2">
            <img 
              src={thumbnailUrl} 
              alt={`Thumbnail for ${title}`} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {type === 'item' && externalUrl ? (
            <a 
              href={externalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
            >
              <span className="truncate">{title}</span>
              <ExternalLink size={14} className="flex-none opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : (
            <span className={cn(
              "truncate",
              type === 'series' && "font-bold text-lg",
              type === 'container' && "font-medium",
            )}>
              {title}
              {type === 'container' && containerType && containerNumber && (
                <span className="text-muted-foreground ml-2 text-sm">
                  ({containerType} {containerNumber})
                </span>
              )}
            </span>
          )}
        </div>

        {type === 'file-unit' && (
          <span className={cn(
            "flex-none flex items-center text-sm ml-2 gap-1",
            `status-${fileUnitStatus}`
          )}>
            {renderStatusIcon(fileUnitStatus)}
            <span className="ml-1 text-xs hidden md:inline">
              {getStatusText(fileUnitStatus)}
            </span>
          </span>
        )}
      </div>

      {type === 'series' && (
        <div className="mt-2 mb-4 ml-5 pl-1 text-sm text-muted-foreground border-l">
          {seriesDescription && (
            <div className="mb-2">
              <span className="font-medium text-foreground">Description: </span>
              {seriesDescription}
            </div>
          )}
          {seriesExtent && (
            <div className="mb-2">
              <span className="font-medium text-foreground">Extent: </span>
              {seriesExtent}
            </div>
          )}
          {seriesArrangement && (
            <div className="mb-2">
              <span className="font-medium text-foreground">System of Arrangement: </span>
              {seriesArrangement}
            </div>
          )}
          {seriesDate && (
            <div className="mb-2">
              <span className="font-medium text-foreground">Date: </span>
              {seriesDate}
            </div>
          )}
        </div>
      )}

      {hasChildren && isExpanded && (
        <div className="ml-5 border-l pl-1 mt-1 animate-slide-in">
          {processedChildren}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
