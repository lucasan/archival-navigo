
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

  // Initial expand state - default containers to open for better UX
  const [isExpanded, setIsExpanded] = useState(type === 'container');
  const [forceRender, setForceRender] = useState(0); // Added to force re-render when needed
  
  // Check if we actually have children
  const hasChildren = Boolean(children && React.Children.count(children) > 0);
  
  console.log(`TreeNode "${title}" - hasChildren: ${hasChildren}, isExpanded: ${isExpanded}, expandAll: ${expandAll}`);

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
  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child as React.ReactElement, {
      searchTerm,
      statusFilter,
      // When a parent matches, force children to be visible regardless of their own match
      isVisible: showAllChildren ? true : (child as React.ReactElement).props.isVisible
    });
  });

  // Force render when expandAll changes
  useEffect(() => {
    if (hasChildren) {
      console.log(`ExpandAll changed to ${expandAll} for ${title}`);
      setIsExpanded(expandAll);
      setForceRender(prev => prev + 1); // Force re-render
    }
  }, [expandAll, hasChildren, title]);
  
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

  // Auto-expand logic - SIMPLIFIED for reliability
  useEffect(() => {
    if ((searchTerm && searchTerm.trim() !== '') || statusFilter !== 'all') {
      // Auto-expand conditions
      if (matchesSearch || hasVisibleDescendants() || hasDescendantItemMatchingSearch()) {
        console.log(`EXPANDING ${title} due to search/filter match`);
        setIsExpanded(true);
        // Force a re-render to make sure the UI updates
        setForceRender(prev => prev + 1);
      }
    }
  }, [searchTerm, statusFilter, matchesSearch, hasVisibleDescendants, hasDescendantItemMatchingSearch, title]);
  
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
    hasVisibleDescendants, 
    children,
    fileUnitStatus
  ]);
  
  // Handle node expansion toggle - SIMPLIFIED for reliability
  const toggleExpand = useCallback(() => {
    if (hasChildren) {
      console.log(`TOGGLE EVENT: ${title} from ${isExpanded} to ${!isExpanded}`);
      setIsExpanded(prevState => !prevState);
    }
  }, [hasChildren, isExpanded, title]);

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

      {/* Render children - key based on forceRender to ensure re-render */}
      {hasChildren && (
        <div 
          key={`children-${forceRender}`}
          className={cn(
            "ml-5 border-l pl-1 mt-1",
            isExpanded ? "block" : "hidden"
          )}
          style={{ display: isExpanded ? 'block' : 'none' }} 
          data-expanded={isExpanded ? "true" : "false"}
        >
          {processedChildren}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
