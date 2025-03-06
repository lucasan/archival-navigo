
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

  // Auto-expand logic when searching or filtering
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
      // Special case: if this is a file unit and has a child item with thumbnail that matches search
      else if (type === 'file-unit' && hasMatchingItemWithThumbnail()) {
        setIsExpanded(true);
      }
    }
  }, [
    searchTerm, 
    statusFilter, 
    matchesSearch, 
    matchesStatusFilter, 
    hasVisibleDescendants, 
    type, 
    hasMatchingItemWithThumbnail
  ]);
  
  // Determine if this node should be displayed
  const shouldDisplay = useMemo(() => {
    // If this node matches the search or filter, always display it and its children
    if ((matchesSearch && searchTerm.trim() !== '') ||
        (type === 'file-unit' && matchesStatusFilter && statusFilter !== 'all')) {
      return true;
    }
    
    // Special case for file units with matching items with thumbnails
    if (type === 'file-unit' && hasMatchingItemWithThumbnail()) {
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
    hasMatchingItemWithThumbnail
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
