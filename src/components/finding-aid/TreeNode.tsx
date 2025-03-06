
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { TreeNodeProps, FileUnitStatus, SeriesNodeProps, ContainerNodeProps, FileUnitNodeProps } from './types';
import { NodeContent } from './NodeContent';
import { SeriesMetadata } from './SeriesMetadata';
import { shouldNodeDisplay, childrenMatchSearch, isNodeOrDescendantVisible } from './treeNodeUtils';
import { useTreeContext } from './TreeContext';

// Main TreeNode component
const TreeNode: React.FC<TreeNodeProps> = (props) => {
  const {
    title,
    type,
    children,
    thumbnailUrl,
    externalUrl,
    level = 0,
    searchTerm = '',
    statusFilter = 'all',
    isVisible = true,
  } = props;

  // Get the global expand state from context
  const { expandAll } = useTreeContext();

  // Type-specific properties with proper type narrowing
  const seriesDescription = type === 'series' ? (props as SeriesNodeProps).seriesDescription : undefined;
  const seriesExtent = type === 'series' ? (props as SeriesNodeProps).seriesExtent : undefined;
  const seriesArrangement = type === 'series' ? (props as SeriesNodeProps).seriesArrangement : undefined;
  const seriesDate = type === 'series' ? (props as SeriesNodeProps).seriesDate : undefined;
  const containerNumber = type === 'container' ? (props as ContainerNodeProps).containerNumber : undefined;
  const containerType = type === 'container' ? (props as ContainerNodeProps).containerType : undefined;
  const fileUnitStatus = type === 'file-unit' ? (props as FileUnitNodeProps).fileUnitStatus || 'open' : undefined;

  // Changed initial state for series to be collapsed
  const [isExpanded, setIsExpanded] = useState(type === 'container');
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
    (fileUnitStatus && fileUnitStatus === statusFilter);
  
  // Determine when to show all children (when parent matches search or filter)
  const showAllChildren = (matchesSearch && searchTerm.trim() !== '') || 
                         (type === 'file-unit' && matchesStatusFilter && statusFilter !== 'all');
  
  // Check if any child items have thumbnails and match the search
  const hasMatchingItemWithThumbnail = useCallback(() => {
    if (!hasChildren || !children || !searchTerm || searchTerm.trim() === '') return false;
    
    return childrenArray.some(child => 
      child.props.type === 'item' && 
      child.props.thumbnailUrl && 
      child.props.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hasChildren, children, childrenArray, searchTerm]);
  
  // Function to check if any descendant item matches the search
  const hasDescendantItemMatchingSearch = useCallback(() => {
    if (!hasChildren || !children || !searchTerm || searchTerm.trim() === '') return false;
    
    // Direct check for immediate children
    const directMatch = childrenArray.some(child => 
      (child.props.type === 'item' && 
       child.props.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    if (directMatch) return true;
    
    // Recursive check for deeper descendants - Check 2 levels deep
    return childrenArray.some(child => {
      if (!child.props.children) return false;
      
      const childChildren = React.Children.toArray(child.props.children) as React.ReactElement[];
      
      // Check each grandchild
      return childChildren.some(grandChild => {
        if (grandChild.props.type === 'item' && 
            grandChild.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
        
        // Check one more level deeper for container > file-unit > item structure
        if (grandChild.props.children) {
          const greatGrandchildren = React.Children.toArray(grandChild.props.children) as React.ReactElement[];
          return greatGrandchildren.some(greatGrandChild => 
            greatGrandChild.props.type === 'item' && 
            greatGrandChild.props.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        return false;
      });
    });
  }, [hasChildren, children, childrenArray, searchTerm]);
  
  // Modify children with search and filter props
  const processedChildren = React.Children.toArray(children).map((child) => {
    return React.cloneElement(child as React.ReactElement, {
      searchTerm,
      statusFilter,
      // When a parent matches, force children to be visible regardless of their own match
      isVisible: showAllChildren ? true : (child as React.ReactElement).props.isVisible
    });
  });

  // Use effect to respond to expandAll changes
  useEffect(() => {
    if (hasChildren) {
      setIsExpanded(expandAll);
    }
  }, [expandAll, hasChildren]);
  
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

  // Auto-expand logic when searching or filtering - ENHANCED
  useEffect(() => {
    // Only auto-expand when actively searching or filtering
    if ((searchTerm && searchTerm.trim() !== '') || statusFilter !== 'all') {
      // If this node matches, expand it to show children
      if (matchesSearch || matchesStatusFilter !== (statusFilter === 'all')) {
        setIsExpanded(true);
      } 
      // If any descendant matches, expand this node
      else if (hasVisibleDescendants()) {
        setIsExpanded(true);
      }
      // Check if this is a container or file unit and has descendant items matching search
      else if ((type === 'container' || type === 'file-unit') && hasDescendantItemMatchingSearch()) {
        setIsExpanded(true);
      }
      // Special case: if this is a file unit and has a child item with thumbnail that matches search
      else if (type === 'file-unit' && hasMatchingItemWithThumbnail()) {
        setIsExpanded(true);
      }
      
      // FORCE EXPANSION: Always expand containers when there's a search
      if (type === 'container' && searchTerm && searchTerm.trim() !== '') {
        // Check if any descendants at any level match the search
        const hasAnyMatchingDescendant = (node: React.ReactElement): boolean => {
          // Check if this node matches
          if (node.props.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
          
          // No children to check
          if (!node.props.children) return false;
          
          // Check children recursively
          const nodeChildren = React.Children.toArray(node.props.children) as React.ReactElement[];
          return nodeChildren.some(hasAnyMatchingDescendant);
        };
        
        // If any descendant matches, force expansion
        if (childrenArray.some(hasAnyMatchingDescendant)) {
          setIsExpanded(true);
        }
      }
    }
  }, [
    searchTerm, 
    statusFilter, 
    matchesSearch, 
    matchesStatusFilter, 
    hasVisibleDescendants, 
    type, 
    hasMatchingItemWithThumbnail,
    hasDescendantItemMatchingSearch,
    childrenArray
  ]);
  
  // Determine if this node should be displayed
  const shouldDisplay = useMemo(() => {
    // If this node matches the search or filter, always display it and its children
    if ((matchesSearch && searchTerm.trim() !== '') ||
        (type === 'file-unit' && matchesStatusFilter && statusFilter !== 'all')) {
      return true;
    }
    
    // Special case for nodes with matching items with thumbnails
    if ((type === 'container' || type === 'file-unit') && 
        (hasMatchingItemWithThumbnail() || hasDescendantItemMatchingSearch())) {
      return true;
    }
    
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
    fileUnitStatus,
    hasMatchingItemWithThumbnail,
    hasDescendantItemMatchingSearch
  ]);
  
  // Handle node expansion toggle
  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
      console.log(`Toggling ${title} to ${!isExpanded ? 'expanded' : 'collapsed'}`);
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

      {hasChildren && (
        <div 
          className={cn(
            "ml-5 border-l pl-1 mt-1 overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {processedChildren}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
