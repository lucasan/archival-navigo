
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { TreeNodeProps, FileUnitStatus } from './types';
import { NodeContent } from './NodeContent';
import { SeriesMetadata } from './SeriesMetadata';
import { shouldNodeDisplay, childrenMatchSearch, isNodeOrDescendantVisible } from './treeNodeUtils';

// Main TreeNode component
const TreeNode: React.FC<TreeNodeProps> = (props) => {
  const {
    title,
    type,
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
  } = props;

  const [isExpanded, setIsExpanded] = useState(type === 'series' || type === 'container');
  const hasChildren = Boolean(children);

  // Process children for search and filter
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];
  
  // Check if this node matches search term
  const matchesSearch = searchTerm.trim() === '' || 
    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (seriesDescription && seriesDescription.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Check if this node matches status filter
  const matchesStatusFilter = statusFilter === 'all' || 
    type !== 'file-unit' || 
    fileUnitStatus === statusFilter;
  
  // Modify children with search and filter props
  const processedChildren = childrenArray.map((child) => {
    return React.cloneElement(child, {
      searchTerm,
      statusFilter,
    });
  });
  
  // Expand nodes when searching or filtering
  useEffect(() => {
    if ((searchTerm && searchTerm.trim() !== '') || statusFilter !== 'all') {
      setIsExpanded(true);
    }
  }, [searchTerm, statusFilter]);
  
  // Check if any descendants match search and filter criteria
  const hasVisibleDescendants = useCallback(() => {
    if (!hasChildren || !children) return false;
    
    // If not searching or filtering, all children are visible
    if (searchTerm.trim() === '' && statusFilter === 'all') {
      return childrenArray.length > 0;
    }
    
    // Check if any direct child or its descendants match the criteria
    return childrenArray.some(node => 
      isNodeOrDescendantVisible(node, searchTerm, statusFilter)
    );
  }, [hasChildren, children, childrenArray, searchTerm, statusFilter]);
  
  // Determine if this node should be displayed
  const shouldDisplay = useMemo(() => {
    return shouldNodeDisplay(
      { 
        title, 
        type, 
        searchTerm, 
        statusFilter, 
        isVisible, 
        seriesDescription, 
        children, 
        fileUnitStatus 
      }, 
      hasVisibleDescendants
    );
  }, [
    isVisible, 
    searchTerm, 
    statusFilter, 
    type, 
    title, 
    seriesDescription,
    matchesSearch, 
    matchesStatusFilter, 
    hasVisibleDescendants, 
    children,
    fileUnitStatus
  ]);
  
  // Handle node expansion toggle
  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  // Early return if node shouldn't be displayed
  if (!shouldDisplay) {
    return null;
  }

  return (
    <div className="animate-fade-in">
      <NodeContent
        type={type}
        title={title}
        externalUrl={externalUrl}
        thumbnailUrl={thumbnailUrl}
        containerType={containerType}
        containerNumber={containerNumber}
        fileUnitStatus={fileUnitStatus}
        toggleExpand={toggleExpand}
        isExpanded={isExpanded}
        hasChildren={hasChildren}
        matchesSearch={matchesSearch}
        searchTerm={searchTerm}
      />

      {type === 'series' && (
        <SeriesMetadata
          description={seriesDescription}
          extent={seriesExtent}
          arrangement={seriesArrangement}
          date={seriesDate}
        />
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
